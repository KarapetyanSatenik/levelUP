## HTTP

The internet is a collection of public computers linked through the shared use of the Internet Protocol (IP) to route messages(ipi @ndhanur ogtgorcman mijocov) It’s made up of many services, including the World Wide Web, email, file sharing, and internet telephony. The World Wide Web (or the web), therefore, is but one part of the internet, though it’s the most visible part, and as people often look at email through web-mail front ends (such as Gmail, Hotmail, and Yahoo!), some of them use the web interchangeably with the internet.

HTTP is how web browsers request web pages. Other parts of the internet have their own protocols and standards to define how they work and how their underlying messages are routed through the internet (such as email with SMTP, IMAP, and POP).

When you open a website in your favorite browser, whether that browser is on a desktop or laptop computer, a tablet, a mobile phone, or any of the myriad other devices that allow internet access.

Suppose that you fire up a browser and go to www.google.com. Within a few seconds, the following will have happened, as illustrated in figure 1.1:

1. The browser requests the real address of www.google.com from a Domain Name System (DNS) server, which translates the human-friendly name www.google.com to a machine-friendly IP address.
If you think of an IP address as a telephone number, DNS is the telephone book. 
When you ask your DNS for the IP address, it often provides the IP address of the nearest server to make your internet browsing faster. Someone based in America will get a different IP address for www.google.com than someone based in Europe, for example, so don’t worry if you get different values of IP addresses for www.google.com than those I’ve given here.
2. The web browser asks your computer to open a Transmission Control Protocol (TCP) connection[1] over IP to this address on the standard web port (port 80)[2] or over the standard secure web port (port 443). Some websites, including Google, use a technology called HSTS to automatically use a Secure HTTP connection (HTTPS), which runs on port 443, so even if you try to connect over HTTP, the connection automatically upgrades to HTTPS before the request is sent.
3. When the browser has a connection to the web server, it can start asking for the website. This step is where HTTP comes in, and I examine how it works in the next section. For now, be aware that the web browser uses HTTP to ask the Google server for the Google home page. If HTTPS is being used (I go into HTTPS in a lot more detail in section 1.4), extra steps are required to set up the encryption that secures the connection.

# NOTE
At this point, your browser will have automatically corrected the shorthand web address (www.google.com) to the more syntactically correct URL address of http://www.google.com. The actual full URL includes the port and would be http://www.google.com:80, but if standard ports are being used (80 for HTTP and 443 for HTTPS), the browser hides the port. If nonstandard ports are being used, the port is shown. Some systems, particularly in development environments, use port 8080 for HTTP or 8443 for HTTPS, for example.
4. The Google server responds with whatever URL you asked for. Typically, what gets sent back from the initial page is the text that makes up the web page in HTML format. HTML is a standardized, structured, text-based format that makes up the text content of a page. It’s usually divided into various sections defined by HTML tags and references other bits of information needed to make the media-rich web pages you’re used to seeing (Cascading Style Sheets [CSS], JavaScript code, images, fonts, and so on). Instead of an HTML page, however, the response may be an instruction to go to a different location. Google, for example, runs only on HTTPS, so if you go to http://www.google.com, the response is a special HTTP instruction (usually, a 301 or 302 response code) that redirects to a new location at https://www.google.com. This response starts some or all of the preceding steps again, depending on whether the redirect address is a different server/port combination, a different port in the same location (such as a redirect to HTTPS), or even a different page on the same server and port. Similarly, if something goes wrong, you get back an HTTP response code, the best-known of which is the 404 Not Found response code.
5. The web browser processes the returned request. Assuming that the returned response is HTML, the browser starts to parse the HTML code and builds in memory the Document Object Model (DOM), which is an internal representation of the page. During this processing, the browser likely sees other resources that it needs to display the page properly (such as CSS, JavaScript, and images).
6. The web browser requests any additional resources it needs. Google keeps its web page fairly lean; at this writing, only 16 other resources are needed. Each of these resources is requested in a similar manner, following steps 1–6, and yes, that includes this step, because those resources may in turn request other resources. The average website isn’t as lean as Google and needs 75 resources,[3] often from many domains, so steps 1–6 must be repeated for all of them. This situation is one of the key things that makes web browsing slow and one of the key reasons for HTTP/2, the main purpose of which is to make requesting these additional resources more efficient, as you’ll see in future chapters.
7. When the browser has enough of the critical resources, it starts to render the page onscreen. Choosing when to start rendering the page is a challenging task and not as simple as it sounds. If the web browser waits until all resources are downloaded, it would take a long time to show web pages, and the web would be an even slower, more frustrating place. But if the web browser starts to render the page too soon, you end up with the page jumping around as more content downloads, which is irritating if you’re in the middle of reading an article when the page jumps down. A firm understanding of the technologies that make up the web—especially HTTP and HTML/CSS/JavaScript—can help website owners reduce these annoying jumps while pages are being loaded, but far too many sites don’t optimize their pages effectively to prevent these jumps.
After the initial display of the page, the web browser continues, in the background, to download other resources that the page needs and update the page as it processes them. These resources include noncritical items such as images and advertising tracking scripts. As a result, you often see a web page displayed initially without images (especially on slower connections), with images being filled in as more of them are downloaded.
8. When the page is fully loaded, the browser stops the loading icon (a spinning icon on or near the address bar for most browsers) and fires the OnLoad JavaScript event, which JavaScript code may use as a sign that the page is ready to perform certain actions.
9. At this point, the page is fully loaded, but the browser hasn’t stopped sending out requests. We’re long past the days when a web page was a page of static information. Many web pages are now feature-rich applications that continually communicate with various servers on the internet to send or load additional content. This content may be user-initiated actions, such as when you type requests in the search bar on Google’s home page and instantly see search suggestions without having to click the Search button, or it may be application-driven actions, such as your Facebook or Twitter feed’s automatically updating without your having to click a refresh button. These actions often happen in the background and are invisible to you, especially advertising and analytics scripts that track your actions on the site to report analytics to website owners and/or advertising networks.

## HTTP


As I mentioned earlier, HTTP stands for Hypertext Transfer Protocol. As the name suggests, HTTP was initially intended to transfer hypertext documents (documents that contain links to other documents), and the first version didn’t support anything but these documents. Quickly, developers realized that the protocol could be used to transfer other file types (such as images), so now the Hypertext part of the HTTP acronym is no longer too relevant, but given how widely used HTTP is, it’s too late to rename it.

HTTP depends on a reliable network connection, usually provided by TCP/IP, which is itself built on some type of physical connection (Ethernet, Wi-FI, and so on). Because communication protocols are separated into layers, each layer can concentrate on what it does well. HTTP doesn’t concern itself with the lower-level details of how that network connection is established. Although HTTP applications should be mindful of how to handle network failures or disconnects, the protocol itself makes no allowances for these tasks.

HTTP is, at heart, a request-and-response protocol. The web browser makes a request, using HTTP syntax, to the web server, which responds with a message containing the requested resource. The key to the success of HTTP is its simplicity. 


GET /page.html↵
HTTP is as simple as that! You provide one of the few HTTP methods (GET, in this case) followed by the resource you want (/page.html). Remember that at this point, you’ve already connected to the appropriate server, using a technology such as TCP/IP, so you’re simply requesting the resource you want from that server and don’t need to be concerned with how that connection happens or is managed.

The first version of HTTP (0.9) allowed only this simple syntax and had only the GET method. In this case, you might ask why you needed to state GET for an HTTP/0.9 request, because it’s superfluous, but future versions of HTTP introduced other methods, so kudos to the inventors of HTTP for having the foresight to see that more methods would come. 
The web server needs only a TCP/IP connection to receive HTTP requests.

As shown at the end of each example, the connection is closed; to send another HTTP command, you need to reopen the connection. To avoid this step, you can use HTTP/1.1 (which keeps the connection open by default, as I discuss later) by entering HTTP/1.1 after the requested resource:
Note that if you’re using HTTP/1.0 or HTTP/1.1, you must press Return twice to tell the web server that you’re finished sending the HTTP request. 
After the server responds, you can reissue the GET command to get the page again. In reality, web browsers usually use this open connection to get other resources rather than the same resource again, but the concept is the same.
Technically, to abide by the HTTP/1.1 specification, HTTP/1.1 requests also require you to specify the host header, for reasons that I (again) discuss later. 
As you can see, the basic HTTP syntax is simple. It’s a text-based request-and-response format, although this format changes under HTTP/2 when it moves to a binary format.

## HTTP 

It was intended to be a way of implementing a web of interconnecting computers to provide access to research and link them so they could easily reference one another in real time; a click of a link would open an associated document. 
HTTP is one many other protocols at the application layer of the OSI model that defines a standard form of data transfer from one source to another.
HTTP is just one of many other protocols used to transfer data at the application layer level.
HTTP is the foundation of data communication for the World Wide Web.
- protocol
A protocol is the special set of rules which specify interactions between the communicating entities.

# HTTP 0.9

From 1989, Tim Berners-Lee and his team at CERN , the European Nuclear Research Center in Switzerland, developed the Hypertext Transfer Protocol, together with the concepts of URL and HTML , which created the foundations of the World Wide Web. First results of this effort in 1991 were the version HTTP 0.9.

Methods supported: GET only
Response type: hypertext only
Connection nature: terminated immediately after the response
Headers: No HTTP headers (cannot transfer other content type files), No status/error codes, No URLs, No versioning
Support: HTTP/0.9 requests have been removed.
keep-alive: N/A

```javascript
Request
GET /
Response
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>301 Moved Permanently</title>
</head><body>
<h1>Moved Permanently</h1>
<p>The document has moved <a href="http://any23.apache.org">here</a>.</p>
</body></html>
```

## HTTP 1.0

In 1996, RFC 1945 became known as HTTP / 1.0. With HTTP / 1.0, a new TCP connection is established before each request and, after the response has been transmitted.

Methods supported: GET , HEAD , POST
Response type: not limited to hypertext (Content-Type header provided ability to transmit files other than plain HTML files — e.g. scripts, stylesheets, media)
Connection nature: terminated immediately after the response
Headers: does not officially required
Support: used by proxies, wget and some IE browsers.
keep-alive: not considered persistent unless a keep-alive header is included.
status code: only define up to 16 status codes.

so we can see HTTP 0.9 doesn’t support headers and HTTP 1.0 supports headers (not officially required).

## Major Problem in both HTTP/0.9 and HTTP/1.0

both are required to open new TCP connection per outstanding Request and it closes it immediately after the response was sent.


## HTTP 1.1


In 1999, RFC 2616 , reflects the HTTP / 1.1 standards, With HTTP / 1.1 a client can use an additional header entry ( keep-alive ) to express a desire not to disconnect in order to be able to use the connection again (persistent connection).

Methods supported: GET , HEAD , POST , PUT , DELETE , TRACE , OPTIONS
Connection nature: long-lived
Support: common use until today.
keep-alive: considered persistent unless declared otherwise.
status code: came with 24 status codes.

### 1- HTTP pipelining: 
is a technique in which multiple HTTP requests are sent on a single TCP connection without waiting for the corresponding responses.
HTTP pipelining is not enabled by default in modern browsers due to proxy servers, Head-of-line blocking (HOL)

## 2- HTTP persistent connection (HTTP keep-alive)

is the idea of using a single TCP connection to send and receive multiple HTTP requests/responses, as opposed to opening a new connection for every single request/response pair.

## Compression/Decompression (Content Encoding) : 
a capability that can be built into web servers and web clients to improve transfer speed and bandwidth utilization, The most common compression schemes include gzip and Deflate.

The web client advertises which compression schemes it supports by including a list of tokens in the HTTP request.
```javascript
GET /encrypted-area HTTP/1.1
Host: www.example.com
Accept-Encoding: gzip, deflate
```
If the server supports compression scheme the server will add a Content-Encoding or Transfer-Encoding field in the HTTP response

## The Performance Issues Of HTTP/1.1
### 1-Head-of-line blocking(HOL blocking)

It as in networking is a performance issue that occurs when a bunch of packets is blocked by the first (a large or slow ) packet in line . It can happen especially in input buffered network switches where out-of-order delivery of packets can occur (arrive out of order). A switch can be composed of buffered input ports, a switch fabric and buffered output ports. If first-in-first-out (FIFO) input buffers are used, only the oldest packet is available for forwarding.


### 2-The repetition of information sent for each request

Each of the requests repeats a lot of the same information. Each includes the same user-agent information and accepted content information, etc.

### 3-The additional round trips(3-Way Handshake) needed.

## SPDY

SPDY is a protocol developed by Google to increase the speed and efficiency of delivering web content. SPDY modifies parts of the HyperText Transfer Protocol (HTTP) to improve web performance.

### HTTP Problems that SPDY Solves

- Single request per connection: HTTP can only fetch one resource at a time, leading to delays and underutilized bandwidth. SPDY allows for many concurrent downloads.
- Client-initiated requests: HTTP requires the user to request content from a server before it can be delivered. With SPDY, the server can “push” data to the client without having to wait for a request, making it possible to load web content before it’s needed.
Redundant Headers: HTTP headers define the behavior of an HTTP transaction. In some cases, the same headers are repeated over the course of a session. SPDY removes unnecessary headers to reduce the amount of bandwidth required.
Uncompressed Data: Compression, which shrinks the size of data during delivery, is optional for HTTP. SPDY forces compression for all communications including headers.

## HTTP/2 — A protocol for greater performance
HTTP/2 was based largely on Google’s own protocol SPDY which had many of the same features found in HTTP/2 and managed to improve data transmission while keeping backwards compatibility. SPDY had already proven many of the concepts used in HTTP/2.

- 1- Binary, instead of textual

Binary protocols are more efficient to parse, more compact “on the wire”, and most importantly, they are much less error-prone, compared to textual protocols like HTTP/1.x, because they often have a number of affordances to “help” with things like whitespace handling, capitalization, line endings, blank lines and so on.

- 2- Streams

an independent, bi-directional sequence of frames exchanged between the client and server within an HTTP/2 connection. Streams have several important characteristics:

A single HTTP/2 connection can contain multiple concurrently open streams, with either endpoint interleaving frames from multiple streams.
Streams can be established and used unilaterally(միակոմանիորեն) or shared by either the client or server.
Streams can be closed by either endpoint.
The order in which frames are sent on a stream is significant. Recipients process frames in the order they are received. In particular, the order of HEADERS and DATA frames is semantically significant.
Streams are identified by an integer. Stream identifiers are assigned to streams by the endpoint initiating the stream.

- 3- Request and Response Multiplexing

is a method in HTTP/2 by which multiple HTTP requests can be sent and responses can be received asynchronously via a single TCP connection. Multiplexing is the heart of HTTP/2 protocol.

With HTTP/1.x, if the client wants to make multiple parallel requests to improve performance, then multiple TCP connections must be used; see Using Multiple TCP Connections. This behaviour is a direct consequence of the HTTP/1.x delivery model, which ensures that only one response can be delivered at a time (response queuing) per connection. Worse, this also results in head-of-line blocking and inefficient use of the underlying TCP connection.

The new binary framing layer in HTTP/2 removes these limitations, and enables full request and response multiplexing, by allowing the client and server to break down an HTTP message into independent frames, interleave them, and then reassemble them on the other end.

- 4- Server Push

is the ability of the server to send multiple responses for a single client request. That is, in addition to the response to the original request, the server can push additional resources to the client, without the client having to request each one explicitly!

- HPACK- Data compression of HTTP headers

HTTP/2 introduces a form of header compression called HPACK. HPACK allows for very efficient header compression, without being vulnerable to compression related attacks such as CRIME. HPACK provides the following:

The ability to encode large headers using a fixed Huffman encoding
The ability to encode commonly used headers as a variable length integer, rather than re-sending the whole header each time.

## HTTP3

The main issue with TCP is that before establishing a session between a client and the server, a TLS handshake is needed to verify for a secure session.
HTTP/2 was unable to solve the issue of latency in lossy and slow connections. To address this, QUIC provides a native multiplexing and the lost packets mainly impact the streams where data has been dropped rather than stalling the entire system.

### The similarities between HTTP/2 and HTTP/3 include:

Both protocols make use of the server push mechanisms.
They offer multiplexing which is made over a single connection via streams.
Both versions utilize header compression as HPACK and QPACK which are tied to packet order.

### Differences between HTTP/2 and HTTP/3

The major difference is that HTTP/3 is based on QUIC as a transport layer to handle streams while HTTP/2 uses TCP to handles streams in the HTTP layer.
HTTP/3 has a much quicker handshake to establish a secure session compared to HTTP/2 which achieves this using TCP and TLS.
Here is a TCP/TLS vs QUIC latency comparison:

### Differences between HTTP/2 and HTTP/3
The major difference is that HTTP/3 is based on QUIC as a transport layer to handle streams while HTTP/2 uses TCP to handles streams in the HTTP layer.
HTTP/3 has a much quicker handshake to establish a secure session compared to HTTP/2 which achieves this using TCP and TLS.
Here is a TCP/TLS vs QUIC latency comparison:
Lastly, HTTP/3 can only be done in a secure and encrypted manner, while the HTTP/2 version can be implemented without HTTPS.
