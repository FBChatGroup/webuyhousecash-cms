-- Drop tables if they exist (for clean initialization)
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS faqs;
DROP TABLE IF EXISTS business_locations;
DROP TABLE IF EXISTS business_hours;
DROP TABLE IF EXISTS business_info;
DROP TABLE IF EXISTS seo_settings;

-- Create seo_settings table
CREATE TABLE IF NOT EXISTS seo_settings (
  id SERIAL PRIMARY KEY,
  site_name VARCHAR(255),
  site_description TEXT,
  google_analytics_id VARCHAR(255),
  google_tag_manager_id VARCHAR(255),
  facebook_pixel_id VARCHAR(255),
  google_verification VARCHAR(255),
  bing_verification VARCHAR(255),
  default_og_image VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create business_info table
CREATE TABLE IF NOT EXISTS business_info (
  id SERIAL PRIMARY KEY,
  business_name VARCHAR(255),
  legal_name VARCHAR(255),
  description TEXT,
  telephone VARCHAR(255),
  email VARCHAR(255),
  website VARCHAR(255),
  street_address VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  postal_code VARCHAR(255),
  country VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT,
  price_range VARCHAR(255),
  logo VARCHAR(255),
  image VARCHAR(255),
  founding_date VARCHAR(255),
  opening_hours JSONB,
  social_profiles JSONB,
  payment_accepted VARCHAR(255),
  area_served VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create business_hours table
CREATE TABLE IF NOT EXISTS business_hours (
  id SERIAL PRIMARY KEY,
  day_of_week VARCHAR(255) NOT NULL,
  opens VARCHAR(255),
  closes VARCHAR(255),
  is_closed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create business_locations table
CREATE TABLE IF NOT EXISTS business_locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255),
  postal_code VARCHAR(255),
  country VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  category VARCHAR(255),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  image VARCHAR(255),
  date TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_seo_settings_modtime
BEFORE UPDATE ON seo_settings
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_business_info_modtime
BEFORE UPDATE ON business_info
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_business_hours_modtime
BEFORE UPDATE ON business_hours
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_business_locations_modtime
BEFORE UPDATE ON business_locations
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_faqs_modtime
BEFORE UPDATE ON faqs
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_testimonials_modtime
BEFORE UPDATE ON testimonials
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

