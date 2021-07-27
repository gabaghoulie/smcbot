import json

puchisms_file = open('puchisms.txt', 'r')
puchisms = puchisms_file.read().split('\n')

histo = {}
for p in puchisms:
	histo[p] = 0

counter_file = open('puchism_counter.json', 'w')
counter_file.write(json.dumps(histo))

quit()
