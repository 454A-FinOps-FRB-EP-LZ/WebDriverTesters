import http from "k6/http";
import { sleep, check } from "k6";

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

// Copy the server link printed by Terraform

const link = "web-alb-1658970598.us-east-1.elb.amazonaws.com";

// Select the route to test ("CPU" or "Memory")

const route = "CPU";

// Select the type of test ("Progressive", "Dramatic Sustained" or "Periodic")

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
