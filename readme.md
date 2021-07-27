# URL Lengthener - Productized

In the current age of authentication, some of the most important links which secure us pass through our emails every single day. Because of this, there is always the risk that *someone* over your shoulder at a coffee shop, workplace, or really anyone who can take a glance or picture at your computer, even for a few seconds, would be able to see the copy-paste versions of these links and use them to reset your passwords and gain access to your account. Is the likelyhood of this low? Most definitely. Is is a risk which should be avoided at all costs due to is damning consequences? Most certainly. 

After the success of [aaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com](https://aaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com/) a few months back, I took it upon myself to productize this and bring it to the mainstream, as who knows how many hackers use OCR to gain access to accounts. This is one of the advantages of my URL Lengthener. Due to the fact that almost every character in the URL is the letter `A` in some variation, it becomes incredibly difficult for OCR programs, much less humans, to be able to access one of these URLs before the intended user does. So, how does one use it?

To create simplicity, the whole system can be self-hosted, or you can use the existing [aaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com API](https://www.npmjs.com/package/url-lengthener#:~:text=url). The simplest way to do so is to fork this repl, though you can always host it on your own. Either way, these are the steps which follow:

1. Run `generate_token.js` to receive a public and private token.
2. Put the private token in an environment variable called `token_hashed`, though you can just put it straigt into `index.js` under the variable `private_token`, though this is discouraged if you are using something like a public repl.
3. When it comes to your application, send a `GET` request to the server to the `/a` route with the two URL parameters being `token`, your public token, and `url`, the URL you need lengthened.
   1. If the token and URL are both correct, the lengthened URL will be returned.
   2. If the token is incorrect, `INVALID_TOKEN` will be returned.
   3. If the token is correct, but the passed URL is not, `INVALID_URL` will be returned.

An example request might look like this:
```curl
curl -XGET 'https://demo.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com/a?url=https%3A%2F%2Ffuckyourusers.com%2F&token=59f4d719c050539b5834dc376d87d2d6c90af3a50767041cae9d24a10f42c2fe2471125bb1b9d7e4ec964437ec395a9a506f26ef1e35073d82518de9eb1f916c'
```

If these instructions are unclear, feel free to leave a comment on the repl or open an issue on the Github repository. Have a great day!