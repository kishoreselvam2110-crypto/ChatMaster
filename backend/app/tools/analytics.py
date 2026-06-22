import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np

def forecast_metric(data: list, periods: int = 5):
    # data is expected to be a list of dicts with 'x' and 'y' values
    if not data:
        return []
        
    df = pd.DataFrame(data)
    X = df[['x']].values
    y = df['y'].values
    
    model = LinearRegression()
    model.fit(X, y)
    
    last_x = X[-1][0]
    future_X = np.array([[last_x + i + 1] for i in range(periods)])
    future_y = model.predict(future_X)
    
    forecast = [{"x": float(future_X[i][0]), "y": float(future_y[i])} for i in range(periods)]
    return forecast
