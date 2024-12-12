import time
import re
from selenium import webdriver

link = "http://web-alb-871117254.us-east-1.elb.amazonaws.com"

while True:
    link_choice = input("Choose the route to test (\"Memory\" or \"CPU\"):\n")
    if link_choice == "Memory" or link_choice == "CPU":
        link = link + "/stress/" + link_choice.lower()
        break

browser = webdriver.Firefox()
browser.get(link)

start_time = time.time()

while time.time()-start_time <= 120:
    browser.refresh()
