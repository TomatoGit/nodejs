const EventEmitter=require('events').EventEmitter;
const channel= new EventEmitter();
channel.on('join',()=>{//事件监听器
    console.log('Welcome!');
});
channel.emit('join');//主动触发事件