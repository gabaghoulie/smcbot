import json

loopisms_file = open('../loopisms.txt', 'r')
loopisms = loopisms_file.read().split('\n')

histo = {}
for p in loopisms:
	histo[p] = 0

counter_file = open('../loopism_counter.json', 'w')
counter_file.write(json.dumps(histo))

quit()
