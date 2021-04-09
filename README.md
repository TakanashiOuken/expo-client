# expo-client

Create by [Expo](https://docs.expo.io/) to run with [Strapi](https://strap.io/documentation/developer-docs/latest/getting-started/quick-start.html)

## Getting Started

### Swagger branch

```
git clone https://github.com/TakanashiOuken/expo-client
git fetch --all
git checkout feature/strapi-swagger
yarn install
expo start
```

### GraphQL branch

```
git clone https://github.com/TakanashiOuken/expo-client
git fetch --all
git checkout feature/strapi-graphql
yarn install
expo start
```

## Configs

./app.json

```
{
    "expo" :{
        "extra": {
            "REACT_NATIVE_API_HOST": "http://192.168.10.119:1337/",
            "REACT_NATIVE_ARTICLES_API_PATH": "articles/",
            "REACT_NATIVE_GRAPHQL_NAME": "graphql",
            "REACT_NATIVE_LOGIN_API_PATH": "auth/local/",
            "REACT_NATIVE_REGISTER_API_PATH": "auth/local/register/"
            }
    }
}
```

> Update REACT_NATIVE_API_HOST to Strapi IP
