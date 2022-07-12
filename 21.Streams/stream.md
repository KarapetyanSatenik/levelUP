
If we want to work with files we have 2 option. File System and stream. 
There are difference between fs and streams. If for example we want to read file via fs, then fs will download the whole file in RAm before returning it, but streams allow work with files chunk by chunk. 
So if we want to read file, stream will take from file first chunk which is by default 16 gb and will download to the RAM. If someone take the chunk from memory the stream will continue reading otherwise will stop. 
That's why streams have 2 moods paused and flowing. When stream stop reading it is in paused mood, but when continue reading it is in mood of flowing. 
We can go from paused mood to flowed mood using
1. stream.resume(), stream.paused()
2. using pipe()
4. listen to the data event

There are 4 types of stream
1. readable
2. writable
3. duplex
4. transfer

