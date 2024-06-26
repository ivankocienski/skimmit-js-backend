#!/usr/bin/env ruby

local_env = File
  .open(".env")
  .read
  .split
  .keep_if { |line| line =~ /^[^#]/ }
  .reduce({}) { |output, line|
    output[$1] = $2 if line =~ /^([^=]+)=(.*)/
    output
  }

command = "export PGPASSWORD=#{local_env['DB_PASSWORD']} && psql -h #{local_env['DB_HOST']} -p #{local_env['DB_PORT']} -U #{local_env['DB_USER']} -d #{local_env['DB_DATABASE']}"

puts "running '#{command}'"
system command
