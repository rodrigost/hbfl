// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'eu-central-1' })

// Declare local variables
const cw = new AWS.CloudWatch()
const alarmName = 'hamster-elb-alarm'
const topicArn = 'arn:aws:sns:eu-central-1:120156428913:hamster-topic'
const tg = 'targetgroup/hamsterTG/18f0c9e3b0cc5b8f'
const lb = 'app/hamsterELB/147139bda3a94cec'

createCloudWatchAlarm(alarmName, topicArn, tg, lb)
.then(data => console.log(data))

function createCloudWatchAlarm (alarmName, topicArn, tg, lb) {
  const params = {
    AlarmName: alarmName,
    ComparisonOperator: 'LessThanThreshold',
    EvaluationPeriods: 1,
    MetricName: 'HealthyHostCount',
    Namespace: 'AWS/ApplicationELB',
    Period: 60, //seconds
    Threshold: 1,
    AlarmActions: [
      topicArn
    ],
    Dimensions: [
      {
        Name: 'TargetGroup',
        Value: tg
      },
      {
        Name: 'LoadBalancer',
        Value: lb
      }
    ],
    Statistic: 'Average', //Other values: minimum, maximum, sum and sample count
    TreatMissingData: 'breaching' //Other values: ignore, not-breaching or missing
  }

  return new Promise((resolve, reject) => {
    cw.putMetricAlarm(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
