## OSI

The Open Systems Interconnection (OSI) model describes seven layers that computer systems use to communicate over a network

The modern Internet is not based on OSI, but on the simpler TCP/IP model. However, the OSI 7-layer model is still widely used, as it helps visualize and communicate how networks operate and helps isolate and solve networking problems.

When clients establish a connection with each other, they follow a common protocol when doing so to ensure that all clients can communicate with each other. This is handled at the Transport layer in the OSI model. The OSI model stands for Open Systems Interconnection and is a model used by software developers and hardware manufacturers to create a standardized set of guidelines so these different technologies can interoperate with each other.

The OSI model consists of 7 layers
7. Application - HTTP, FTP, IRC, SSH, DNS
6. Presentation - SSL, SSH, IMAP, FTP, MPEG, JPEG
5. Session - Sockets, WinSock
4. Transport - TCP, UDP
3. Network - IP, ICMP, IGMP
2. Data Link - PPP, Switch, Bridge
1. Physical - Coax, Fiber, Wireless, Hubs, Repeaters

7. Application
Human-computer interaction layer, where applications can access the network services
The application layer is used by end-user software such as web browsers and email clients. It provides protocols that allow the software to send and receive information and present meaningful data to users. A few examples of application layer protocols are the Hypertext Transfer Protocol (HTTP), File Transfer Protocol (FTP), Post Office Protocol (POP), Simple Mail Transfer Protocol (SMTP), and Domain Name System (DNS).

6. Presentation
Ensures that data is in a usable format and is where data encryption occurs
The presentation layer prepares data for the application layer. It defines how two devices should encode, encrypt, and compress data so it is received correctly on the other end. The presentation layer takes any data transmitted by the application layer and prepares it for transmission over the session layer.

5. Session
Maintains connections and is responsible for controlling ports and sessions
The session layer creates communication channels, called sessions, between devices. It is responsible for opening sessions, ensuring they remain open and functional while data is being transferred, and closing them when communication ends. The session layer can also set checkpoints during a data transfer—if the session is interrupted, devices can resume data transfer from the last checkpoint.

4. Transport
Transmits data using transmission protocols including TCP and UDP
The transport layer takes data transferred in the session layer and breaks it into “segments” on the transmitting end. It is responsible for reassembling the segments on the receiving end, turning it back into data that can be used by the session layer. The transport layer carries out flow control, sending data at a rate that matches the connection speed of the receiving device, and error control, checking if data was received incorrectly and if not, requesting it again.

3. Network
Decides which physical path the data will take
The network layer has two main functions. One is breaking up segments into network packets, and reassembling the packets on the receiving end. The other is routing packets by discovering the best path across a physical network. The network layer uses network addresses (typically Internet Protocol addresses) to route packets to a destination node.

2. Data Link
Defines the format of data on the network
The data link layer establishes and terminates a connection between two physically-connected nodes on a network. It breaks up packets into frames and sends them from source to destination. This layer is composed of two parts—Logical Link Control (LLC), which identifies network protocols, performs error checking and synchronizes frames, and Media Access Control (MAC) which uses MAC addresses to connect devices and define permissions to transmit and receive data.

1. Physical
Transmits raw bit stream over the physical medium
The physical layer is responsible for the physical cable or wireless connection between network nodes. It defines the connector, the electrical cable or wireless technology connecting the devices, and is responsible for transmission of the raw data, which is simply a series of 0s and 1s, while taking care of bit rate control.