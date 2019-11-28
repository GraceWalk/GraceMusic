// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.set('words', 'Hello world!');
// testObject.save().then(function(testObject) {
//     console.log('保存成功。')
// })

window.eventHub.on('uploaded', (data) => {
    console.log(data);
})