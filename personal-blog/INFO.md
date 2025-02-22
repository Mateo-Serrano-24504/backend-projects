# Personal Blog Project

Once you have clone the repository as indicated in the [main README file](../README.md), you are ready to go ahead.

### Requirements

This projects needs some dependencies of Node.JS to properly work. To install them, run the following in your terminal:

```bash
npm install
```

The dependencies are listed in [the package.json file](./package.json).

Additionally, the project will run a **HTTPS server** with *Express*, so you will need a **self-signed certificate** to have it properly working. You will not have to generate it by yourself, you will need **OpenSSL** in your system so that it gets generated when running the project.

I assume you use *Git*, as you have cloned this repository from *GitHub*, so you probably already have OpenSSL in your system. You can check so by executing the following in your *Git Bash*:

```bash
openssl version
```

If you do not have OpenSSL in your system, you will have to install it.

* **Windows**: Download and install OpenSSL from [this link](https://slproweb.com/products/Win32OpenSSL.html).
* **MacOS**: You can install OpenSSL using Homebrew: `brew install openssl`.
* **Linux**: You can install OpenSSL using your distribution's package manager, e.g., `sudo apt install openssl` for Ubuntu.

### How to run

Once you have installed everything, running the project is as easy as running this in your terminal:

```
npm start
```

This will both generate the self-signed certificate and run the server itself. If everything is fine, you will see a message in the console indicating the URL of the home page.

## HTTPS

When you run `npm start`, the project will automatically generate a self-signed SSL certificate using OpenSSL. This is necessary because the project runs over HTTPS, which provides encrypted communication between the client and server.

The self-signed certificate is generated at runtime, and it may trigger browser warnings about security, as it's not trusted by default. You can bypass these warnings in development, but in production, you would typically use a certificate issued by a trusted Certificate Authority.

Also, you can try accessing all URLs using the *HTTP* protocol. The server will redirect all these accesses to use the HTTPS protocol. However, some browsers may warn you about potential redirect loops.

### Authentication

You can try accessing the different URLs and make requests using *cURL* (using the *-k* flag for insecure sites), but most of them will require **authentication**. Although I do not want to get too much into details, you must know the server uses the **standard HTTP Basic Authentication**, and you can access the protected pages by typing the allowed user and password:

```bash
name: admin
pass: admin-pass
```

As an admin, you will be able to visit, add, edit and delete articles. As a regular user, you will only be able to visit articles.

### URLs

The following is a list with the URLs that need no authentication to access:

* `/home` - The home page.
* `/article/:id` - The article with the specified id. If it does not exist, you will se a `404` message.

Quite few pages, as most of them need authentication. The following is a list with those URLs that need authentication to access:

* `/admin` - The home page, but with additional buttons to add, delete and update articles.
* `/article/new` - The *article editor*, used to upload a new article.
* `/article/edit/:id` - The *article editor*, but used to edit an existent article.

I strongly suggest not using cURL to send `DELETE`, `POST` or `PUT` request, as the application is not designed as an API and the results might not be the ones you expect.