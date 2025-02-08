import pandas as pd
import awswrangler as wr
import names
import random
import os
import time
import datetime

# S3 bucket name (ensure this is set in Lambda environment variables)
BUCKET_NAME = os.environ["BUCKET_NAME"]


def generate_sample_data():
    n = 50
    male_names = [names.get_first_name(gender="male") for _ in range(n)]
    female_names = [names.get_first_name(gender="female") for _ in range(n)]

    genders = ["M"] * n + ["F"] * n
    credits = [round(random.gauss(7, 7), 2) for _ in range(n * 2)]

    df = pd.DataFrame(
        {"name": male_names + female_names, "gender": genders, "credit": credits}
    )

    return df.sample(frac=1)


def lambda_handler(event, context):
    df = generate_sample_data()

    timestamp = datetime.datetime.fromtimestamp(time.time()).strftime(
        "%Y-%m-%d_%H-%M-%S"
    )
    s3_path = f"s3://{BUCKET_NAME}/transaction/data_{timestamp}.csv"

    wr.s3.to_csv(df, path=s3_path, header=False, index=False)

    return {"statusCode": 200, "body": f"CSV written to {s3_path}"}
