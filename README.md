# Relatório de Medição da Perbras

Este projeto é a refatoração do relatório do sistema de medição da Perbras. O frontend (esta), foi feito em Vue e o backend feito no Maker.

Nesta forma, a página feita em Vue será estática e servida direto pelo Tomcat (Pasta Maker.commons), enquanto o Maker serivirá como servidor de API, apenas, deixando de tratar a página estática também.

## Executando
Para rodar o ambiente de desenvolvimento, basta após clonar o repositório, executar:

```
npm install
```
### Ambiente de Desenvolvimento

Para rodar no ambiente de desenvolvimento

```
npm run dev
```

Na pasta "fake", se encontra os modelos da API, como serão servidas. Para emular basta executar:

```
json-server api.json
```

### Compilando para produção

Após editar o arquivo "vue.config.js" como o path da pasta do servidor, basta executar o comando:

```
npm run build
```

Após isso, basta copiar a pasta "dist" e colar na pasta do Tomcat (Maker.commons)
