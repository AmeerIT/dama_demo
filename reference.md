{
"projectId": "6922db8b062a1123c88f",
"projectName": "asi",
"settings": {
"services": {
"account": true,
"avatars": true,
"databases": true,
"locale": true,
"health": true,
"storage": true,
"teams": true,
"users": true,
"sites": true,
"functions": true,
"graphql": true,
"messaging": true
},
"auth": {
"methods": {
"jwt": true,
"phone": true,
"invites": false,
"anonymous": false,
"email-otp": false,
"magic-url": false,
"email-password": true
},
"security": {
"duration": 31536000,
"limit": 0,
"sessionsLimit": 10,
"passwordHistory": 0,
"passwordDictionary": false,
"personalDataCheck": false,
"sessionAlerts": false,
"mockNumbers": []
}
}
},
"tablesDB": [
{
"$id": "dental_inventory",
"name": "Dental Inventory Database",
"enabled": true
}
],
"tables": [
{
"$id": "shipments",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Shipments",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "shipment_number",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "shipment_type",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "destination_location_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "destination_supplier_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "destination_address",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "package_type",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "package_count",
"type": "integer",
"required": false,
"array": false,
"min": -9223372036854775808,
"max": 9223372036854775807,
"default": null
},
{
"key": "total_weight",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "weight_unit",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "dimensions",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "items_total",
"type": "integer",
"required": false,
"array": false,
"min": -9223372036854775808,
"max": 9223372036854775807,
"default": null
},
{
"key": "quantity_total",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "declared_value",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "shipment_contents",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "carrier",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "tracking_number",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "shipping_cost",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "status",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "scheduled_ship_date",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "actual_ship_date",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "expected_delivery_date",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "actual_delivery_date",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "packed_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "shipped_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "order_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "requisition_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_shipments_number",
"type": "key",
"status": "available",
"columns": [
"shipment_number"
],
"orders": []
},
{
"key": "idx_shipments_status",
"type": "key",
"status": "available",
"columns": [
"status"
],
"orders": []
}
]
},
{
"$id": "inventory_items",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Inventory Items",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "item_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "quantity",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "location_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "bin_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "cost_center_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "unit_cost",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "total_value",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "costing_method",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "item_cost_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "status",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "batch_number",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "expiry_date",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "serial_numbers",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "last_inspected",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "inspected_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "rejection_reason",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "below_min",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "needs_reorder",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "restock_status",
"type": "string",
"required": false,
"array": false,
"size": 12,
"default": null,
"encrypt": false
},
{
"key": "uom_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_inventory_items_item_id",
"type": "key",
"status": "available",
"columns": [
"item_id"
],
"orders": []
},
{
"key": "idx_inventory_items_location",
"type": "key",
"status": "available",
"columns": [
"location_id"
],
"orders": []
},
{
"key": "idx_inventory_items_status",
"type": "key",
"status": "available",
"columns": [
"status"
],
"orders": []
},
{
"key": "idx_inventory_items_expiry",
"type": "key",
"status": "available",
"columns": [
"expiry_date"
],
"orders": []
}
]
},
{
"$id": "order_items",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Order Items",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "order_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "item_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "quantity",
"type": "integer",
"required": false,
"array": false,
"min": -9223372036854775808,
"max": 9223372036854775807,
"default": null
},
{
"key": "unit_price",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "total_price",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "requested_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "request_type",
"type": "string",
"required": false,
"array": false,
"size": 48,
"default": null,
"encrypt": false
},
{
"key": "status",
"type": "string",
"required": false,
"array": false,
"size": 20,
"default": "pending",
"encrypt": false
},
{
"key": "requested_at",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "rejected_at",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_order_items_order",
"type": "key",
"status": "available",
"columns": [
"order_id"
],
"orders": []
}
]
},
{
"$id": "item_movements",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Item Movements",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "item_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "from_inventory_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "to_inventory_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "from_location_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "to_location_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "from_cost_center_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "to_cost_center_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "quantity",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "unit_cost",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "total_value",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "item_cost_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "movement_type",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "reference_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "authorized_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "handled_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "movement_date",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "reference_type",
"type": "string",
"required": false,
"array": false,
"size": 18,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_item_movements_type",
"type": "key",
"status": "available",
"columns": [
"movement_type"
],
"orders": []
},
{
"key": "idx_item_movements_date",
"type": "key",
"status": "available",
"columns": [
"movement_date"
],
"orders": []
}
]
},
{
"$id": "shipment_items",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Shipment Items",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "shipment_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "item_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "inventory_item_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "quantity",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "serial_numbers",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "batch_number",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "package_number",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "barcode",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_shipment_items_shipment",
"type": "key",
"status": "available",
"columns": [
"shipment_id"
],
"orders": []
}
]
},
{
"$id": "notifications_settings",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")"
],
"databaseId": "dental_inventory",
"name": "notifications_settings",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "target_roles",
"type": "string",
"required": false,
"array": false,
"size": 1024,
"default": null,
"encrypt": false
},
{
"key": "notification_urgency",
"type": "integer",
"required": false,
"array": false,
"min": 0,
"max": 10,
"default": null
},
{
"key": "notification_type",
"type": "string",
"required": false,
"array": false,
"size": 48,
"default": null,
"encrypt": false
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 48,
"default": null,
"encrypt": false
},
{
"key": "message",
"type": "string",
"required": false,
"array": false,
"size": 48,
"default": null,
"encrypt": false
}
],
"indexes": []
},
{
"$id": "item_status_history",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Item Status History",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "inventory_item_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "previous_status",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "new_status",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "changed_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "reason",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "action_taken",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_item_status_history_inventory",
"type": "key",
"status": "available",
"columns": [
"inventory_item_id"
],
"orders": []
}
]
},
{
"$id": "items",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Items",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "sku",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "price",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "usage_type",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "lifecycle",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "requires_tracking",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "is_controlled_substance",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "is_kit",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "usage_method",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "category_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "base_uom_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "manufacturer",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "manufacturer_part_number",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "specifications",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "expires_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "barcode",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "hazmat_classification",
"type": "string",
"required": false,
"array": false,
"size": 128,
"default": null,
"encrypt": false
},
{
"key": "reorder_point",
"type": "integer",
"required": false,
"array": false,
"min": 0,
"max": 9223372036854775807,
"default": null
},
{
"key": "reorder_quantity",
"type": "integer",
"required": false,
"array": false,
"min": 0,
"max": 9223372036854775807,
"default": null
},
{
"key": "expiration_tracking",
"type": "boolean",
"required": false,
"array": false,
"default": false
},
{
"key": "supplier_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "approval_override",
"type": "boolean",
"required": false,
"array": false,
"default": false
},
{
"key": "auto_approve",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "auto_request_stock",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "approved_by",
"type": "string",
"required": false,
"array": false,
"size": 32,
"default": null,
"encrypt": false
},
{
"key": "approved",
"type": "boolean",
"required": false,
"array": false,
"default": false
}
],
"indexes": [
{
"key": "idx_items_sku",
"type": "key",
"status": "available",
"columns": [
"sku"
],
"orders": []
},
{
"key": "idx_items_category",
"type": "key",
"status": "available",
"columns": [
"category_id"
],
"orders": []
}
]
},
{
"$id": "notifications",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"create(\"guests\")",
"read(\"guests\")",
"update(\"guests\")"
],
"databaseId": "dental_inventory",
"name": "Notifications",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "user_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "message",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "is_read",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "sent_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "read_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "request_type",
"type": "string",
"required": false,
"array": false,
"size": 48,
"default": null,
"encrypt": false
},
{
"key": "notification_type",
"type": "string",
"required": false,
"array": false,
"size": 48,
"default": null,
"encrypt": false
},
{
"key": "notification_urgency",
"type": "integer",
"required": false,
"array": false,
"min": 0,
"max": 10,
"default": 0
},
{
"key": "target_roles",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "item_id",
"type": "string",
"required": false,
"array": false,
"size": 23,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_notifications_user",
"type": "key",
"status": "available",
"columns": [
"user_id"
],
"orders": []
},
{
"key": "idx_notifications_read",
"type": "key",
"status": "available",
"columns": [
"is_read"
],
"orders": []
}
]
},
{
"$id": "receipts",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Receipts",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "receipt_number",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "supplier_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "order_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "delivery_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "received_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "received_date",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "total_amount",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "currency",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "exchange_rate",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "shipping_cost",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "duties_cost",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "other_costs",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "payment_terms",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "status",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "has_invoice_attachment",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "has_packing_slip",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "has_photos",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_receipts_number",
"type": "key",
"status": "available",
"columns": [
"receipt_number"
],
"orders": []
},
{
"key": "idx_receipts_supplier",
"type": "key",
"status": "available",
"columns": [
"supplier_id"
],
"orders": []
},
{
"key": "idx_receipts_status",
"type": "key",
"status": "available",
"columns": [
"status"
],
"orders": []
}
]
},
{
"$id": "user_settings",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "User Settings",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "user_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "settings",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
}
],
"indexes": []
},
{
"$id": "categories",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Categories",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "category_code",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "parent_category_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "level",
"type": "integer",
"required": false,
"array": false,
"min": -9223372036854775808,
"max": 9223372036854775807,
"default": null
},
{
"key": "sort_order",
"type": "integer",
"required": false,
"array": false,
"min": -9223372036854775808,
"max": 9223372036854775807,
"default": null
},
{
"key": "is_active",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "icon",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "color",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_categories_code",
"type": "unique",
"status": "available",
"columns": [
"category_code"
],
"orders": []
},
{
"key": "idx_categories_parent",
"type": "key",
"status": "available",
"columns": [
"parent_category_id"
],
"orders": []
},
{
"key": "idx_categories_level",
"type": "key",
"status": "available",
"columns": [
"level"
],
"orders": []
}
]
},
{
"$id": "suppliers",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Suppliers",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "supplier_code",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "contact_email",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "contact_phone",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "address",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "payment_terms",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "lead_time_days",
"type": "integer",
"required": false,
"array": false,
"min": -9223372036854775808,
"max": 9223372036854775807,
"default": null
},
{
"key": "minimum_order_value",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "is_active",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "is_preferred",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "currency",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "auto_approve",
"type": "boolean",
"required": false,
"array": false,
"default": false
},
{
"key": "auto_request_stock",
"type": "boolean",
"required": false,
"array": false,
"default": false
},
{
"key": "email_template",
"type": "string",
"required": false,
"array": false,
"size": 5000,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_suppliers_code",
"type": "key",
"status": "available",
"columns": [
"supplier_code"
],
"orders": []
}
]
},
{
"$id": "disposal_records",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Disposal Records",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "inventory_item_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "disposed_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "disposal_date",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "disposal_method",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "quantity",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "reason",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "documentation",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_disposal_records_inventory",
"type": "key",
"status": "available",
"columns": [
"inventory_item_id"
],
"orders": []
},
{
"key": "idx_disposal_records_date",
"type": "key",
"status": "available",
"columns": [
"disposal_date"
],
"orders": []
}
]
},
{
"$id": "damage_reports",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Damage Reports",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "report_number",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "delivery_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "package_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "item_id",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "damage_type",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "severity",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "quantity_affected",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "estimated_value_loss",
"type": "double",
"required": false,
"array": false,
"min": -1.7976931348623157e+308,
"max": 1.7976931348623157e+308,
"default": null
},
{
"key": "reported_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "reported_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "action_taken",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "claim_number",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_damage_reports_number",
"type": "key",
"status": "available",
"columns": [
"report_number"
],
"orders": []
},
{
"key": "idx_damage_reports_severity",
"type": "key",
"status": "available",
"columns": [
"severity"
],
"orders": []
}
]
},
{
"$id": "email_templates",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Email Templates",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": true,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "title",
"type": "string",
"required": true,
"array": false,
"size": 200,
"default": null,
"encrypt": false
},
{
"key": "body",
"type": "string",
"required": true,
"array": false,
"size": 5000,
"default": null,
"encrypt": false
},
{
"key": "supplier_id",
"type": "string",
"required": true,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "is_default",
"type": "boolean",
"required": false,
"array": false,
"default": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": false
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": true,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "urgency_type",
"type": "string",
"required": false,
"array": false,
"size": 50,
"default": null,
"encrypt": false
},
{
"key": "urgency_date",
"type": "string",
"required": false,
"array": false,
"size": 50,
"default": null,
"encrypt": false
},
{
"key": "urgency",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_email_templates_supplier",
"type": "key",
"status": "available",
"columns": [
"supplier_id"
],
"orders": []
},
{
"key": "idx_email_templates_deleted",
"type": "key",
"status": "available",
"columns": [
"isDeleted"
],
"orders": []
},
{
"key": "idx_email_templates_supplier_default",
"type": "key",
"status": "available",
"columns": [
"supplier_id",
"is_default"
],
"orders": []
}
]
},
{
"$id": "orders",
            "$permissions": [
"create(\"users\")",
"read(\"users\")",
"update(\"users\")",
"delete(\"users\")"
],
"databaseId": "dental_inventory",
"name": "Orders",
"enabled": true,
"rowSecurity": false,
"columns": [
{
"key": "name",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "order_number",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "supplier_id",
"type": "string",
"required": true,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "status",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": "draft",
"encrypt": false
},
{
"key": "requested_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "sent_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "expected_delivery",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "received_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "tracking_number",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "carrier",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "total_items",
"type": "integer",
"required": false,
"array": false,
"min": -9223372036854775808,
"max": 9223372036854775807,
"default": null
},
{
"key": "total_quantity",
"type": "integer",
"required": false,
"array": false,
"min": -9223372036854775808,
"max": 9223372036854775807,
"default": null
},
{
"key": "created_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "updated_at",
"type": "datetime",
"required": false,
"array": false,
"format": "",
"default": null
},
{
"key": "created_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "updated_by",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "role",
"type": "string",
"required": false,
"array": false,
"size": 255,
"default": null,
"encrypt": false
},
{
"key": "isDeleted",
"type": "boolean",
"required": false,
"array": false,
"default": null
},
{
"key": "notes",
"type": "string",
"required": false,
"array": false,
"size": 1000,
"default": null,
"encrypt": false
},
{
"key": "description",
"type": "string",
"required": false,
"array": false,
"size": 1000,
"default": null,
"encrypt": false
}
],
"indexes": [
{
"key": "idx_orders_supplier",
"type": "key",
"status": "available",
"columns": [
"supplier_id"
],
"orders": []
},
{
"key": "idx_orders_status",
"type": "key",
"status": "available",
"columns": [
"status"
],
"orders": []
},
{
"key": "idx_orders_deleted",
"type": "key",
"status": "available",
"columns": [
"isDeleted"
],
"orders": []
},
{
"key": "idx_orders_order_number",
"type": "key",
"status": "available",
"columns": [
"order_number"
],
"orders": []
}
]
}
],
"functions": [
{
"$id": "6935da32002b54234f2f",
            "name": "listUsers",
            "runtime": "node-16.0",
            "specification": "s-0.5vcpu-512mb",
            "execute": [
                "label:admin"
            ],
            "events": [],
            "scopes": [
                "users.read"
            ],
            "schedule": "",
            "timeout": 15,
            "enabled": true,
            "logging": true,
            "entrypoint": "src/main.js",
            "commands": "npm install",
            "path": "functions/listUsers"
        },
        {
            "$id": "create_user_function_id",
"name": "createUser",
"runtime": "node-16.0",
"specification": "s-0.5vcpu-512mb",
"execute": [
"users"
],
"events": [],
"scopes": [
"users.write"
],
"schedule": "",
"timeout": 15,
"enabled": true,
"logging": true,
"entrypoint": "src/main.js",
"commands": "npm install",
"path": "functions/createUser"
},
{
"$id": "update_user_password_function_id",
            "name": "updateUserPassword",
            "runtime": "node-16.0",
            "specification": "s-0.5vcpu-512mb",
            "execute": [
                "users"
            ],
            "events": [],
            "scopes": [
                "users.write"
            ],
            "schedule": "",
            "timeout": 15,
            "enabled": true,
            "logging": true,
            "entrypoint": "src/main.js",
            "commands": "npm install",
            "path": "functions/updateUserPassword"
        },
        {
            "$id": "update_user_status_function_id",
"name": "updateUserStatus",
"runtime": "node-16.0",
"specification": "s-0.5vcpu-512mb",
"execute": [
"users"
],
"events": [],
"scopes": [
"users.write"
],
"schedule": "",
"timeout": 15,
"enabled": true,
"logging": true,
"entrypoint": "src/main.js",
"commands": "npm install",
"path": "functions/updateUserStatus"
},
{
"$id": "update_user_labels_function_id",
            "name": "updateUserLabels",
            "runtime": "node-16.0",
            "specification": "s-0.5vcpu-512mb",
            "execute": [
                "users"
            ],
            "events": [],
            "scopes": [
                "users.write"
            ],
            "schedule": "",
            "timeout": 15,
            "enabled": true,
            "logging": true,
            "entrypoint": "src/main.js",
            "commands": "npm install",
            "path": "functions/updateUserLabels"
        },
        {
            "$id": "694448ae00304d0d277f",
"execute": [
"users"
],
"name": "sendEmail",
"enabled": true,
"logging": true,
"runtime": "node-16.0",
"scopes": [
"users.read"
],
"events": [],
"schedule": "",
"timeout": 15,
"entrypoint": "src/main.js",
"commands": "npm install",
"specification": "s-0.5vcpu-512mb",
"path": "functions/sendEmail"
}
]
}
