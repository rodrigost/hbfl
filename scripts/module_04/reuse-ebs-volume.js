// Imports
const AWS = require('aws-sdk')

AWS.config.update({region: 'eu-central-1'})

// Declare local variables
const ec2 = new AWS.EC2()
const volumeId = 'vol-07393994211f6ed61' //root from the bitnami AMI
const instanceId = 'i-07bdbc529159a26fb'// 'i-0e1e56da99e32b8ec'

// detachVolume(volumeId)
// .then(() => 
attachVolume(instanceId, volumeId)
.then((data) => console.log('Created instance with:', data))

function detachVolume (volumeId) {
  const params = {
    VolumeId: volumeId,
    Force: true
  }

  return new Promise((resolve, reject) => {
    ec2.detachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function attachVolume (instanceId, volumeId) {
  const params = {
    InstanceId: instanceId,
    VolumeId: volumeId,
    Device: '/dev/xvda'
  }

  return new Promise((resolve, reject) => {
    ec2.attachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
