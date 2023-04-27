# Snip-Snip

<!-- ABOUT -->
<br />

Snip-Snip is a code manager designed to allow users to create & organize code snippets. This can benefit programmers who find themselves often reusing small chunks of code and can also serve as a study aid to current learners. With Snip-Snip, you can write & save code snippets in your language of choice with the built-in code editor. No worries about formatting or styling. You can also make folders to logically organize your saved code snippets. You can easily transport snippets between the folders you create or delete them if you no longer find them useful.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![JavaScript][JavaScript]][JavaScript-url][![React][React.js]][React-url][![Node][Node.js]][Node-url][![Express][Express]][Express-url][![Postgres][Postgres]][Postgres-url][![webpack][webpack]][webpack-url][![Git][Git]][Git-url][![TailwindCSS][Tailwind]][Tailwind-url]

## Getting Started

<br />
Currently, you may use Snip-Snip by copying the supplied docker-compose.yml file in this repo. The app relies on Redis for sessions and a PostgreSQL database that has already been setup for you by extending the base Docker image.

<br />By default, the app assumes your connection string to be: <br /> **postgres://postgres:postgres@snip_db:5432/snip_db**

If you would like to use an alternative username, password, or container name with your PostgreSQL service, please pass an environment variable named **PG_URI** to the snip_app service providing a new connection string in the format:
**postgres://username:password@container_name:5432/snip_db**

Similarly, if you would like to use a different container name for your Redis service, pass in an environment variable to the snip_app service named: **REDIS_CLIENT** with the name of your Redis container.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Authors

- Kennan Budnik [@kobudnik](https://github.com/kobudnik) | [Linkedin](https://www.linkedin.com/in/kobudnik/)

[React.js]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org/
[JavaScript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://www.javascript.com/
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en/
[Express]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[Redux]: https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white

[Postgres-url]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white](https://www.postgresql.org/)
[Git]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com/
[Tailwind]: https://img.shields.io/badge/TailwindCSS-DD0031?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[webpack]: https://img.shields.io/badge/Webpack-0769AD?style=for-the-badge&logo=webpack&logoColor=white
[webpack-url]: https://webpack.js.org/guides/getting-started/
