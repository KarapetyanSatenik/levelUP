# Deference between TCP UDP

## Reliability

- TCP is reliable while UDP is not.

- When the TCP segments arrive at the destination, the protocol makes sure that all the segments were received and there is no error in the transmission and all segments are organized back into the correct order.


- On the other hand, UDP doesn’t even care that datagrams were received by the receiver.

## Connection type

- TCP is connection-oriented while UDP is connection less.

- TCP uses a 3-way handshake to establish the connection before the data transmission and on top of that, TCP uses a 4-step procedure to make sure that all the data was actually sent and received by the receiver before closing the connection.

- In UDP, no procedure to check on transmission status.

## ERROR CHECKING

- A header checksum is used to ensure error-free data transmission.
- A UDP header also has a checksum, but it is optional for IPv4 and only necessary for IPv6. If a bit is flipped, a byte mangled, or some other badness happens to a packet, then it is highly likely that the receiver of that broken packet will notice the problem due to a checksum mismatch.

- TCP is the dominant protocol and is used in WEB, telnet, FTP and E-mail.
- Yes, UDP is faster and is preferred for video calls (guess what causes the dropping frames while buffering!) and VoIP (Voice over IP).

### TCP 3-Way Handshake Process

TCP needs 3 handshakes to establish the connection:

1. The client sends an SYN message
2. The server replies with an SYN/ACK message
3. The client responds with an ACK message

- Step 1 (SYN): In the first step, the client wants to establish a connection with a server, so it sends a segment with SYN(Synchronize Sequence Number) which informs the server that the client is likely to start communication and with what sequence number it starts segments with

- Step 2 (SYN + ACK): Server responds to the client request with SYN-ACK signal bits set. Acknowledgement(ACK) signifies the response of the segment it received and SYN signifies with what sequence number it is likely to start the segments with

- Step 3 (ACK): In the final part client acknowledges the response of the server and they both establish a reliable connection with which they will start the actual data transfer