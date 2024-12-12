import http from "k6/http";
import { sleep, check } from "k6";

// export const options = {
//     duration: "1m",
//     vus: 10,
//     cloud: {
//         projectID: 3721358,
//         name: 'Test 1'
//     }
// }

// export const options = {
//     stages: [
//         {duration: "1m", target: 5},
//         {duration: "1m", target: 20},
//         {duration: "1m", target: 5}
//     ],
//     cloud: {
//         projectID: 3721358,
//         name: 'Test 2'
//     }
// }

const progressiveTest = [
    {"duration": "90s", "target": 3},
    {"duration": "1m", "target": 10},
    {"duration": "90s", "target": 3}
];

const dramaticSustainedTest = [
    {"duration": "30s", "target": 2},
    {"duration": "1m", "target": 10},
    {"duration": "30s", "target": 2},
    {"duration": "1m", "target": 10},
    {"duration": "30s", "target": 2}
];

const periodicTest = [
    {"duration": "1m", "target": 5},
    {"duration": "30s", "target": 9},
    {"duration": "1m", "target": 5},
    {"duration": "30s", "target": 9},
    {"duration": "1m", "target": 5}
];

const performanceTests = {
    "Progressive": progressiveTest,
    "Dramatic Sustained": dramaticSustainedTest,
    "Periodic": periodicTest
}

// Select the type of test ("Progressive", "Dramatic Sustained" or "Periodic")

const link = "web-alb-1658970598.us-east-1.elb.amazonaws.com";
const route = "CPU";
const test = "Periodic";

export const options = {
    stages: performanceTests[test],
    cloud: {
        projectID: 3721358,
        name: test + " " + route + " Test"
    }
}

export default function() {
    
    const result = http.get("http://" + link + "/stress/" + route.toLowerCase());
    
    check(result, {
        "Successful Requests": (response) => (response.status == 200),
    });

    sleep(Math.random()*5)

}

export function handleSummary() {

}
