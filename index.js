function createEmployeeRecord(input) {
    return {
        firstName: input[0],
        familyName: input[1],
        title: input[2],
        payPerHour: input[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(inputs) {
    return inputs.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord,dateStamp) {
    const dateStampArray = dateStamp.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStampArray[1]),
        date: dateStampArray[0],
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord,dateStamp) {
    const dateStampArray = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStampArray[1]),
        date: dateStampArray[0],
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord,date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date)
    if (timeInEvent && timeOutEvent) {
        return (timeOutEvent.hour - timeInEvent.hour) / 100
    } else {
        return 0
    }
}

function wagesEarnedOnDate(employeeRecord,date) {
    return hoursWorkedOnDate(employeeRecord,date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((a,b) => a + wagesEarnedOnDate(employeeRecord,b.date),0)
}

function findEmployeeByFirstName(srcArray,firstName) {
    return srcArray.find(employeeRecord => employeeRecord.firstName === firstName)
}

function calculatePayroll(srcArray) {
    return srcArray.reduce((a,b) => a + allWagesFor(b),0)
}