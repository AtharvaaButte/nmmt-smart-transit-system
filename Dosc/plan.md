The only sane order (memorize this)
🔥 PHASE 0 – Foundation (do this first)

Before any module logic:

Database connection

JWT utils

Auth middleware

RBAC middleware

Global error handler

If this isn’t solid, everything breaks later.

🔥 PHASE 1 – AUTH MODULE (ENTRY POINT)

Why first?
Because every protected API depends on it.

Implement:

Admin login

Employee login

JWT issuing

Don’t overbuild. Just login.

🔥 PHASE 2 – TRIP MODULE (CORE)

Trip defines:

Who is driving

Which bus

Which route

When tracking is valid

Without trip:

Tracking is meaningless

Public ETA is meaningless

Implement FIRST:

Create trip (admin)

Start trip (employee)

End trip (employee)

Trip state validation

This is the heart of the system.

🔥 PHASE 3 – TRACKING MODULE (CORE)

Now tracking finally makes sense.

Implement:

Beacon log API (hardware → backend)

Validate:

Active trip exists

Bus is assigned

Beacon belongs to stop

Save log

Update last-seen stop

At this point:

Your system actually “works”

🔥 PHASE 4 – SUPPORTING MODULES (CRUD)

Now you build what trips depend on:

Order:

Route

Stop

Beacon

Bus

Employee

These are mostly CRUD + validation.

They are boring on purpose.

🔥 PHASE 5 – PUBLIC MODULE (OUTPUT)

Only after tracking exists:

Implement:

Route list

Stops of route

Last bus position

ETA calculation (basic)

Now users can SEE something.