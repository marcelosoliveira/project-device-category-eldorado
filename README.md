# Projeto Dispositivo com Categoria Eldorado.

## Teste técnico para vaga Dev. Back End.

### Desafio:

* Desenvolva uma aplicação web de gerenciamento de dispositivo simples.
* Os dispositivos têm (Id, categoria, cor, número). A categoria do dispositivo também deve ser gerenciada pela aplicação e cada categoria tem um (id, nome).
* Essa API deve permitir:
* Login e autenticação não são necessários;
* O aplicativo da web deve ter um menu com duas opções: (Gerenciamento de categoria, Dispositivo de Gestão);
* Deve ser implementado um CRUD simples com (Create, Read e Delete) não é necessário o update devido ao tempo;
* Para o dispositivo:
	* id: (gerado automaticamente);
	* Categoria: um dropdown que deve ter as opções das categorias;
	* Cor: string, com validação de apenas 16 caracteres;
	* partNumber(número): inteiro positivo;
* Para a categoria:
	* id: gerado automaticamente, inteiro, e autoincrementado;
	* Nome: não deve estar vazio e todas suas categorias não devem ter mais de 128 caracteres;
* Todos estes campos são obrigatórios.
* Livre para qualquer layout mais o aplicativo deve listar todos os dispositivos e categorias, e também tem telas ou componentes que permitem ao usuário criar novas categorias e dispositivos ou excluí-los.
* Testes no back-end não são obrigatorios, porém serão um extra valioso.
* Deve ser feito o deploy da aplicação completa (AWS, GCP, Heroku ou qualquer outra de sua escolha).
* Principais tecnologias que devem ser utilizadas no desenvolvimento
	* Node.js
	* Angular
	* Mysql

### Utilização do Backend e Frontend
* Para inicializar o uso da aplicação, utilize npm install, assim instalando as depedências.

### Testes Back-End
* Foi utilizado as bibliotecas jest e frisby para realizar testes de integração.

### Banco de dados
* Para popular o banco de dados execute os testes(npm test), certifique-se que as variáveis de ambientes estejam inicializadas.

### Deploy Heroku
* app-devicecategory: https://app-devicecategory.herokuapp.com/
* Documentação Swagger: https://appdevicecategory.herokuapp.com/swagger-ui.html/

### Executar pelo Docker
* Inicie o console na pasta raiz do projeto, onde existe o arquivo docker-compose.yml e digite o comando || docker-compose up -d || assim o docker vai baixar as imagens customizadas para executar os containers.
* Para acessar a aplicação digite o endereço || http://localhost:8080 || e para acessar a documentação swagger || http://localhost:3000/swagger-ui.html ||
* Para destruir os containers, inicie o console e digite o comando || docker-compose down ||

#### OBS: 
* Para utilizar o deploy, precisa aguardar alguns segundos até o servidor do heroku sair do estado de espera, por ser uma conta gratuita os servidores do heroku ficam em mode de espera.
