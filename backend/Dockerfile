# ---------- Estágio 1: build ----------
FROM node:24-alpine AS build
WORKDIR /app

# pnpm na mesma versão exigida pelo projeto
RUN npm install -g pnpm@11 && pnpm config set strict-dep-builds false

# Copia o manifesto primeiro para aproveitar o cache de camadas
COPY package.json ./
RUN pnpm install

# Copia o código e compila o TypeScript para dist/
COPY . .
RUN pnpm build

# ---------- Estágio 2: produção ----------
FROM node:24-alpine AS production
WORKDIR /app

RUN npm install -g pnpm@11 && pnpm config set strict-dep-builds false

# Apenas dependências de produção
COPY package.json ./
RUN pnpm install --prod

# Código compilado vindo do estágio de build
COPY --from=build /app/dist ./dist

# Arquivos que o sequelize-cli e a documentação usam em tempo de execução
COPY .sequelizerc ./
COPY src/config ./src/config
COPY src/migrations ./src/migrations
COPY src/docs ./src/docs

# Roda com usuário sem privilégios
USER node

EXPOSE 3000

# Aplica as migrations e depois inicia a API
CMD ["sh", "-c", "./node_modules/.bin/sequelize-cli db:migrate && node dist/server.js"]