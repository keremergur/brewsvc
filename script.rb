require 'json'

output = %x( brew services list --json )
parsed = JSON.parse(output)

parsed.each do |svc|
    puts svc['name'] +' '+ svc['status']
end