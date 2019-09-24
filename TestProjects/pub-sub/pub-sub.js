//构建频道
const events=require('events');
const channel=new events.EventEmitter();//创建频道————事件发射器
channel.clients={};
channel.subscriptions={};
//有新的客户端加入
channel.on('join',function(id,client){
    this.clients[id]=client;//频道添加客户端
    this.subscriptions[id]=(senderID,message)=>{
        if(id!=senderID){
            this.clients[id].write(id+' :\n'+message+'----------------------\n');//发消息————将消息写到除自己以外的其他客户端
        }
    };
    this.on('broadcast',this.subscriptions[id]);//发消息事件监听器
});
//用户离开
channel.on('leave',function(id){
    channel.removeListener('broadcast',this.subscriptions[id]);//移除发消息事件监听器broadcast
    channel.emit('broadcast',id,`${id} has left the chatroom.\n`);
});
//新用户加入
const net=require('net');
const server=net.createServer(client=>{//用户加入
    const id=`${client.remoteAddress}:${client.remotePort}`;
    channel.emit('join',id,client);//发出join事件，指明id和client对象
    client.on('data',data=>{
        data=data.toString();
        channel.emit('broadcast',id,data);//当有用户发送数据时，发出broadcast事件，指明id和消息
    });
    client.on('close',()=>{//客户端关闭事件监听器
        channel.emit('leave',id);//发出客户离开的事件
    });
});
server.listen(8888);