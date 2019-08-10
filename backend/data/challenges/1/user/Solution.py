def solution(l):
    prev = None
    duplicates = 0
    for i in l:
        if prev is not None and i == prev:
            duplicates += 1
        prev = i
    return duplicates
