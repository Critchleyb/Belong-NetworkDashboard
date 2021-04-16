# BELONG Network Dashboard

This is a Network dashboard built for Belong Gaming Arenas. It uses A React Front End, and Dot Net Core Back End.

The Dashboard interacts with merakis dashboard API to collect the data from our switches.

This repo is for display purposes only. The application is not designed to work for other organizations.

# Flow of Data

The application has a back end server, that stores store information, a name, storeNumber and squadName. On application load, this data is pulled from the database and given to the front end.

When a user selects a store from the dropdown, it pushes the user to a Network page that then makes a request to the back end to get the devices from the Meraki API that are tagged with that store number and an "ArenaDashboard" tag. The dropdown on this page is then populated with that device list.

When a user selects a device, another request is sent to the back end to get the Clients of the device from the Meraki API. That data is then sent back to the front end and displayed in a table.

All state is localy managed, as the application was not big enough to warrent Mobx / Redux.
