FROM node:latest as dep

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:alpine
WORKDIR /app

COPY --from=dep /app/node_modules ./node_modules
COPY --from=dep /app/.next ./.next
COPY --from=dep /app/tsconfig.json ./tsconfig.json
ADD . .


EXPOSE 3000

CMD ["yarn", "start"]
