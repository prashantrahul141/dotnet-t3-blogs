## Front end of a blogging back using ASP .NET 8 in T3 Stack.

This is a frontend for a blogging app web apis I made in ASP .NET 8:
https://github.com/prashantrahul141/BlogWebApiDotNet

### Building

This project uses pnpm make sure you have it installed. [Installation instructions](https://pnpm.io/installation)

Keep these in a `.env` file in the root directory.

```sh
# base endpoint url to the server.
# for server see here https://github.com/prashantrahul141/blogwebapidotnet
next_public_base_api_url="http://localhost:5248"
```

Install all packages

```sh
$ pnpm install
```

Build and start production server

```sh
$ pnpm build && pnpm start
```
