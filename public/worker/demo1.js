self.addEventListener('message', function (e) {
    self.postMessage("worker start:");
    let a = []
    for (let i = 0; i < 10000000; i++) {
        a.push("test")
    }
    a.map(item => item + "1")
    a.map(item => item + "2")
    a.map(item => item + "3")
    self.postMessage("worker end:");
    self.postMessage("worker send message:" + e.data);
    self.close();
}, false)