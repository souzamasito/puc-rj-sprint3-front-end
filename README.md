# Source 2 Sea - MVP

Este é o MVP (Minimum Viable Product) de um projeto desenvolvido para a sprint 3 do curso de Full Stack da PUC/RJ. Tem como objetivo o cadatramento de informaçoes sobre poluição nas praias do Brasil. O sistema foi desenvolvido em HTML, CSS e JavaScript e utiliza uma API externa da Via CEP que permite o preenchimento da cidade e UF automaticamente. 

A poluição dos oceanos é uma ameaça aos sistemas marinhos e à saúde humana. Uma maior vigilância por parte da sociedade pode contribuir na mitigação deste problema.

Com esse sistema o usuário será possível conhecer melhor este problema para o acionamento das autoridades para providências.

Benefícios deste sistema:

-Mapear os locais as áreas das praias com ocorrência de descarte irregular de resíduos; 
-Criar um repositório de informação sobre as áreas problemáticas para banhistas e autoridades; e
-Contribuir para as políticas públicas de saneamento básico.

## Descrição

O sistema permite que o usuário registre informações sobre a praia, CEP, cidade, UF, tipo de lixo e a data onde foi observado. Estas informações ficam registradas em uma lista e podem ser excluídas a qualquer tempo.

![esquema]([https://github.com/souzamasito/puc-rj-sprint3-front-end/blob/main/src/imagem/esquema.png])

---
## Como executar em modo de desenvolvimento

1. Clonar o repositório.
2. Abrir o arquivo index.html no seu navegador.
3. Preencher os campos e clicar em adicionar.
4. O registro pode ser excluído e alterado.

##Como executar através do Docker
Certifique-se de ter o Docker instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal e seus arquivos de aplicação e Execute como administrador o seguinte comando para construir a imagem Docker:

$ docker build -t nome_da_sua_imagem .
Uma vez criada a imagem, para executar o container basta executar, como administrador, seguinte o comando:

$ docker run -d -p 8080:80 nome_da_sua_imagem
Uma vez executando, para acessar o front-end, basta abrir o http://localhost:8080/#/ no navegador.

Para mais comandos, veja a documentação do docker.

## Tecnologias utilizadas

HTML, CSS e JavaScript
API externa: https://viacep.com.br/


### Versão

Versão 1.0.1 (abril/2024)
Exibe, insere, altera e exclui registros de praias com lixo.

### Autor

Este projeto foi desenvolvido por Marco Antonio de Souza e pode ser encontrado no [Gihub](https://github.com/souzamasito?tab=repositories).



