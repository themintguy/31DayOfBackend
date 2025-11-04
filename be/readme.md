## basics of 

 - express
 - ts
 - redis



 # Strings
SET key value
GET key
INCR counter
EXPIRE key 60  # TTL in seconds

# Hash
HSET user:1 name "Alice" age 25
HGETALL user:1

# List
LPUSH queue job1
RPUSH queue job2
LPOP queue
RPOP queue
BLPOP queue 0  # blocking pop

# Set
SADD tags "python" "redis"
SISMEMBER tags "redis"

# Sorted Set
ZADD leaderboard 100 "Alice"
ZRANGE leaderboard 0 -1 WITHSCORES
