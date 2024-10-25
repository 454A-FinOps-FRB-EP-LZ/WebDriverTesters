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



# browsers = []

# while True:
#     browsers_choice = input("Enter the number of browsers to launch:\n")
#     if re.fullmatch(r"[1-9]\d*", browsers_choice) is not None:
#         browsers = int(browsers_choice)*[webdriver.Firefox()]
#         for browser in browsers:
#             browser.get(link)
#         break

# print("You have launched " + int(len(browsers)) + " browsers.")

# while True:
#     stop_choice = input("Type \"Stop\" to close the web drivers.\n")
#     for browser in browsers:
#         browser.close()
