# Socket.IO CORS Demo

A simple demonstration showing Socket.IO CORS behavior with hardcoded approved ports.

## Purpose

This repository demonstrates potential issues with Socket.IO CORS configuration. The server is configured to only allow connections from port `9999`, but clients running on ports `3000` and `3001` should be blocked.

## Quick Start

1. **Clone and install dependencies:**

   ```bash
   git clone <this-repo>
   cd socket-io-cors
   npm install
   ```

2. **Start all services at once:**

   ```bash
   npm run dev
   ```

   Or start them individually:

   ```bash
   # Terminal 1: Start the Socket.IO server
   npm run server

   # Terminal 2: Start client on port 3000
   npm run client-3000

   # Terminal 3: Start client on port 3001
   npm run client-3001
   ```

## What This Demo Shows

### Server Configuration

- **Port:** 8000
- **Approved CORS Origins:** Only port `9999`
- **Expected Behavior:** Should reject connections from ports 3000 and 3001

### Clients

- **Client 1:** http://localhost:3000 (should be blocked)
- **Client 2:** http://localhost:3001 (should be blocked)
- **Both clients:** Attempt to connect to the Socket.IO server

### Testing the CORS Issue

1. Open http://localhost:3000 in your browser
2. Click "Connect" button
3. Observe the connection attempt in both:

   - Browser console/client interface
   - Server terminal logs

4. Repeat with http://localhost:3001

### Expected vs Actual Results

**Expected:** Connections from ports 3000 and 3001 should be blocked by CORS policy.

**Actual:** [Document what actually happens when you test this]

## Server Health Check

Visit http://localhost:8000/health to see server status and approved ports.

## Files Structure

```
socket-io-cors/
├── package.json          # Dependencies and npm scripts
├── server.js             # Socket.IO server with CORS config
├── client/
│   └── index.html        # HTML client (served on both ports)
└── README.md            # This file
```

## Dependencies

- **socket.io**: ^4.7.4 (latest version)
- **express**: ^4.18.2
- **http-server**: ^14.1.1 (dev dependency for serving client)

## CORS Configuration Details

The server uses this CORS configuration:

```javascript
const APPROVED_PORTS = [9999]; // Only port 9999 is approved

const io = new Server(httpServer, {
  cors: {
    origin: function (origin, callback) {
      // Extract port from origin and check against approved list
      const url = new URL(origin);
      const port = parseInt(url.port);

      if (APPROVED_PORTS.includes(port)) {
        callback(null, true); // Allow
      } else {
        callback(new Error("CORS: Port not approved"), false); // Block
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});
```

## Issue Reporting

Use this repository to demonstrate Socket.IO CORS behavior by:

1. Following the setup instructions
2. Testing connections from non-approved ports
3. Documenting the actual behavior vs expected behavior
4. Sharing results in Socket.IO GitHub issues

## License

MIT

# socket-io-cors-issue
