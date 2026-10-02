-- PostgreSQL Schema for Farm Management System (FMS)

-- 1. Herds Table
CREATE TABLE herds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    herd_code VARCHAR(50) UNIQUE NOT NULL,
    herd_name VARCHAR(100) NOT NULL,
    arrival_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Master Cattle Inventory Transactions
CREATE TABLE cattle_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_date DATE NOT NULL,
    herd_id UUID REFERENCES herds(id) ON DELETE CASCADE,
    movement_type VARCHAR(50) NOT NULL, -- 'دخول/شراء', 'نفوق', 'ذبح اضطراري', 'مبيعات', 'تعديل جرد'
    head_count INT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Weight Records (Average Weight Calculations Only)
CREATE TABLE weight_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    weighing_date DATE NOT NULL,
    herd_id UUID REFERENCES herds(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL, -- 'صغير', 'وسط', 'كبير', 'جامبو', 'عيادة'
    head_count INT NOT NULL,
    total_weight_kg NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Bulk Feed Storage Inventory
CREATE TABLE feed_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feed_type VARCHAR(50) UNIQUE NOT NULL, -- 'علف مركز', 'سيلاج', 'دريس', 'تبن', 'TMR'
    current_stock_kg NUMERIC(12, 2) NOT NULL DEFAULT 0,
    unit_type VARCHAR(20) NOT NULL, -- 'شكارة', 'بالة'
    unit_weight_kg NUMERIC(8, 2) NOT NULL,
    min_safety_days INT DEFAULT 7,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Daily Feed Dispense per Herd
CREATE TABLE feed_dispense_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispense_date DATE NOT NULL,
    herd_id UUID REFERENCES herds(id) ON DELETE CASCADE,
    feed_type VARCHAR(50) REFERENCES feed_inventory(feed_type),
    quantity_kg NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
