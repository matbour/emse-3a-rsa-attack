from os.path import dirname
import numpy as np
from scipy.stats import pearsonr

# Attacking a toy RSA by Correlation Power Analysis
# ===
# Authors: Mathieu Bour and Dimitri Bret
# École Nationale Supérieure des Mines de Saint-Étienne

# RSA constants
P = 17597
Q = 29009
N = P * Q  # 510471373
e = 65537
r = (P - 1) * (Q - 1)
d = 82369537
expectedKey = '100111010001101110000000001'
samples = 1000

# Load curves
curves = list(range(samples))
messages = list(range(samples))

# Generate
curvesDir = dirname(__file__) + '/assets/curves'
messagesDir = dirname(__file__) + '/assets/messages'

for i in range(samples):
    with open(curvesDir + '/curve_%d.txt' % i) as f:
        values = list(map(
            lambda x: float(x),
            list(filter(
                lambda x: x != '' and x != '-1000.0',
                f.readline().split(' ')
            ))
        ))
        curves[i] = values

    with open(messagesDir + '/msg_%d.txt' % i) as f:
        messages[i] = int(f.readline())

curves = np.array(curves)


def hamming(x):
    """
    Get the hamming weight of x (e.g. the number of ones in the binary representation of x)
    :param x:
    :return:
    """
    if not isinstance(x, str):
        x = bin(x)

    return x.count("1")


key = "1"  # We know that the key starts with 1
T = messages
time = 1
steps = len(curves[0])

while time < steps:
    X = curves[:, time]
    T0 = [(y * y) % N for y in T]  # T0 = T*T
    T1 = [(y[1] * messages[y[0]]) % N for y in enumerate(T0)]  # T1 = T0 * M
    Y0 = [hamming((y * y) % N) for y in T0]  # Y0 = H(T0 * T0)
    Y1 = [hamming(y) for y in T1]  # Y1 = H(T1)

    r0 = pearsonr(X, Y0)
    corr0 = r0[0]
    r1 = pearsonr(X, Y1)
    corr1 = r1[0]

    if corr0 > corr1:
        choice = 0
        key += '0'
        time += 1
        T = T0
    else:
        choice = 1
        key += '1'
        time += 2
        T = T1

    print("T = %d, %f vs %f => %d" % (time, corr0, corr1, choice))

print("Generated: " + key)
print("Expected : " + expectedKey)
