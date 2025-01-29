import time

import schedule

from scrape_with_ai import scrape_with_ai


def job():
    scrape_with_ai()


schedule.every(1).hour.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)
