# PokeApp

O **PokeApp** é uma Pokédex com uma página principal exibindo uma lista de pokémons que podem ser marcados como favoritos. Há uma tela de detalhes para cada pokémon, acessível através de seus respectivos cards na Pokédex. Também há uma página que mostra apenas os pokémons marcados como favoritos.

## Tecnologias Utilizadas

- **Angular**
- **Ionic**
- **PokeAPI**

## Arquitetura e Design

Este projeto foi desenvolvido utilizando Angular e Ionic, seguindo uma arquitetura modular e componentizada. A seguir, algumas características e decisões de design que guiaram a implementação:

### Componentização

Cada funcionalidade principal foi encapsulada em componentes específicos, garantindo que cada parte do código seja responsável por uma única funcionalidade, facilitando a manutenção e a escalabilidade do projeto.

### Carregamento sob demanda

Utilizei lazy loading para carregar os componentes e módulos apenas quando necessários. Dessa forma, a aplicação carrega mais rapidamente e utiliza menos recursos, melhorando a experiência do usuário.

### Standalone Components

Optei por utilizar standalone components, simplificando a estrutura do projeto e melhorando a legibilidade do código, tornando a aplicação mais modular e fácil de entender.

### Estrutura Básica

A estrutura básica do projeto, que inclui componentes essenciais como o cabeçalho e o menu de navegação, está sempre presente. Outros componentes são carregados dinamicamente conforme necessário.

### Consumo da PokeAPI

A aplicação consome a API [PokeAPI](https://pokeapi.co/) para obter as informações dos pokémons. Isso é feito através de um serviço dedicado, que lida com todas as requisições HTTP e fornece os dados necessários para os componentes.

### Estilo de Codificação

Segui boas práticas de codificação, utilizando TypeScript para garantir tipagem estática, e adotando padrões como DRY para evitar repetição de código, mantendo em um componente principal, ou no serviço dedicado à PokeAPI, os códigos que são utilizados em mais de um componente.

### Padrões de Design

Utilizei o padrão de design de injeção de dependência fornecido pelo Angular, facilitando a substituição e troca de serviços sem modificar os componentes que os utilizam.

### Responsividade

A aplicação foi projetada para ser responsiva, utilizando Ion UI Components e SCSS para garantir uma boa experiência em dispositivos móveis e desktops.

## Capturas de Tela

<table>
  <tr>
    <td align="center">
      <img src="/src/screenshots/pokedex-desktop.png" alt="Pokédex (Desktop)" title="Pokédex (Desktop)">
      <br>
      <em>Pokédex (Desktop)</em>
    </td>
    <td align="center">
      <img src="/src/screenshots/pokedex-cel.png" alt="Pokédex (Mobile)" title="Pokédex (Mobile)">
      <br>
      <em>Pokédex (Mobile)</em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/src/screenshots/pokemon-details-desktop.png" alt="Pokémon Details - Venusaur (Desktop)" title="Pokémon Details - Venusaur (Desktop)">
      <br>
      <em>Pokémon Details - Venusaur (Desktop)</em>
    </td>
    <td align="center">
      <img src="/src/screenshots/pokemon-details-cel.png" alt="Pokémon Details - Venusaur (Mobile)" title="Pokémon Details - Venusaur (Mobile)">
      <br>
      <em>Pokémon Details - Venusaur (Mobile)</em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="/src/screenshots/menu-desktop.png" alt="Menu de navegação (Desktop)" title="Menu de navegação (Desktop)">
      <br>
      <em>Menu de navegação (Desktop)</em>
    </td>
    <td align="center">
      <img src="/src/screenshots/menu-cel.png" alt="Menu de navegação (Mobile)" title="Menu de navegação (Mobile)">
      <br>
      <em>Menu de navegação (Mobile)</em>
    </td>
  </tr>
</table>

## Demonstração de Usabilidade

[Demonstração em Vídeo](https://youtu.be/wu38jSbT2aI)
