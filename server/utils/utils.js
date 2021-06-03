const kill = require('kill-port');

let portKill = async (port) => {
    try {
        await kill(port, 'tcp');
    } catch(err) {
        console.error(err);
    }
}

module.exports = { portKill };