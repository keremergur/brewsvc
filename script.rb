require 'json'

output = %x( brew services list --json )
parsed = JSON.parse(output)

parsed.each do |service|
    puts service['name'] +' '+ service['status']
end