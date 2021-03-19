// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'eu-central-1' })

// Declare local variables
const route53 = new AWS.Route53()
const hzId = '/hostedzone/Z01801161Z851W1JS847M'

createRecordSet(hzId)
.then(data => console.log(data))

function createRecordSet (hzId) {
  const params = {
    HostedZoneId: hzId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: 'hbfl.online',
            Type: 'A',
            AliasTarget: {
              DNSName: 'hamsterELB-668203651.eu-central-1.elb.amazonaws.com',
              EvaluateTargetHealth: false,
              HostedZoneId: 'Z215JYRZR1TBD5' //Hosted zone Id of the *Application Load Balancer*, first ID column, available at https://docs.aws.amazon.com/general/latest/gr/elb.html
            }
          }
        }
      ]
    }
  }
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/elb.html

  return new Promise((resolve, reject) => {
    route53.changeResourceRecordSets(params, (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })
}
