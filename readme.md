# Visually Encrypted Links

In our current day and age, links are more important than ever in our lives. It is ever so important that we not only protect these from the virtual world, but the physical one as well. 

Ever since the launch of [aaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com](https://aaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com/) and it successfully having 120k+ users within the first day, I knew I could, and had to, go bigger.

To tackle the aforementioned issues, we can not only encrypt said links digitally, but also visually. The repetetive nature of an AX56 URL combined with the security of AES encryption algorithms, can confuse a OCR program and a human while also making brute forcing close to impossible. With this in mind, we can create some of the safest and most secure links anyone will come to know, all with just a few lines of code. 

## Advantages

- Multiple Encrypted Requests*
  - Transferring the multiple key-pairs across multiple requests prevents any machine-side programs or browser extensions from snooping in on the action very easily.
  > *Due to issues with client-side decryption, we have reduced down to only visual encryption for now, but actual encryption is soon to come.
- Anti-OCR and Atni-Human-Copying
  - OCR programs are very likely to miss the ever so small accents on the links, and sometimes not even the entire link, leading to it being close to impossible to decrypt the link from a picture.
  - Humans would take an incredible time to manually transcribe the 200+ character URLs, leaving human decryption out of the picture.
- Incredibly Lightweight
  - The entire program, library included, is less than 10KB and therefore incredibly fast. You won't experience any slowdowns while having a greater piece of mind with your links.
- Anti-Automated Link Sniffing
  - Even if someone gets ahold of one of the sent links, chances are they'll attempt to use it hours after it was initially used. As the links are single-use only, they will be straight out of luck.


## Get It

Currently you can either self host or join the closed beta. If you are legitimately interested in joining, feel free to reach out at getstarted@piemadd.com]. It is currently free, though will have a price of $2/Month for commercial uses in the future.

## How does it work?
While the concepts of a [url lengthener](https://ax56.pro) and RSA encryption are already widely available, you may be wondering how one can encrypt a link digitally. Well, its very similar to how SSL, what allows your browser connection to be secure, works. When the link is "encrypted", a 256-bit RSA keypair is generated and the public key is sent along to the end user in the form of a link. Meanwhile, the database stores the private key and the resulting link. When the end user clicks on the link, another keypair is generated, but this time the end user's public key is encrypted with the original user's public key. That is then sent to the server, which decrypts the public key with it's private key, and then encrypts the link with the end-user's public key. The encrypted URL is finally sent back to the end user where their private key is finally able to decrypt the URL and visit the resulting site. Confused? Me too.

## Self Host

1. Fork the [repl](https://replit.com/@piemadd/productized-url-lengthenizer).
   1. Do note that this can only currently be run on Replit due to how SSL is handled and the use of Replit DB.
2. Delete the `views` folder and rename `view-no-analytics` to `views`. The `views` folder's templates are connected to Plausible for some simple analytics of mine and I'm guessing you probably don't want those.
3. Simply click the run button.

Now, you will be able to log into the resulting site using [Repl Auth](https://docs.replit.com/hosting/authenticating-users-repl-auth) and yourself only. Multi-user support is coming soon.

You can simply paste a link in, copy the result, and send it off to the intended recipient.

## Non-Hosted/Free Uses

### Bookmarklet
> Encrypts the prompted for link visually and then allows you to copy the result to the clipboard

While you might not initially get the purpose of using this bookmarklet, it can be useful for simply deterring any attention in the physical world from your computer. Simply make a bookmarklet with the following code and get started.

```js
javascript:var input_url=window.prompt("Enter your URL: ");function str2hex(a){for(var r=[],n=0,e=a.length;n<e;n++){var t=Number(a.charCodeAt(n)).toString(16);r.push(t)}return r.join("")}function hex2a(a){return a.split("").map(a=>{return{0:"a",1:"à",2:"á",3:"â",4:"ã",5:"ä",6:"å",7:"æ",8:"A",9:"À",a:"Á",b:"Â",c:"Ã",d:"Ä",e:"Å",f:"Æ"}[a]}).join("")}try{new URL(input_url)}catch(a){console.error("URL is not valid",a)}let new_url=hex2a(str2hex(input_url));for(;new_url.length<200;)new_url="áaaÂ"+new_url;new_url="https://aaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com/a?"+new_url,window.prompt("Please copy the resulting URL: ",new_url);
```

### Node.js Library
A library to visually encrypt your urls in Node and Typescript is available [here](https://www.npmjs.com/package/url-lengthener).

### Python Library
A library to visually encrypt your urls in Python is available [here](https://pypi.org/project/ax56/) (not maintained by me).

## Closing Remarks
This project still has some time to go before the Release launch, so expect some changes over the next month or two. I am currently looking at a mid-to-late August release into v1.0, and any feedback is greatly appreciated.