from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database models using OOP approach
class Database:
    def __init__(self):
        self.conn = None
    
    def connect(self):
        self.conn = psycopg2.connect(
            host=os.environ.get('DB_HOST', 'db'),
            database=os.environ.get('DB_NAME', 'realestatedb'),
            user=os.environ.get('DB_USER', 'postgres'),
            password=os.environ.get('DB_PASSWORD', 'postgres')
        )
        self.conn.autocommit = True
        return self.conn
    
    def close(self):
        if self.conn:
            self.conn.close()

class PropertyModel:
    def __init__(self, db):
        self.db = db
    
    def init_tables(self):
        conn = self.db.connect()
        cur = conn.cursor()
        
        # Create properties table
        cur.execute('''
        CREATE TABLE IF NOT EXISTS properties (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            price VARCHAR(50) NOT NULL,
            price_value INTEGER NOT NULL,
            location VARCHAR(255) NOT NULL,
            beds INTEGER NOT NULL,
            baths INTEGER NOT NULL,
            sqft INTEGER NOT NULL,
            type VARCHAR(50) NOT NULL,
            description TEXT,
            lat FLOAT,
            lng FLOAT,
            is_favorite BOOLEAN DEFAULT FALSE
        );
        ''')
        
        # Create property_features table
        cur.execute('''
        CREATE TABLE IF NOT EXISTS property_features (
            id SERIAL PRIMARY KEY,
            property_id INTEGER REFERENCES properties(id),
            feature VARCHAR(255) NOT NULL
        );
        ''')
        
        # Create property_images table
        cur.execute('''
        CREATE TABLE IF NOT EXISTS property_images (
            id SERIAL PRIMARY KEY,
            property_id INTEGER REFERENCES properties(id),
            image_url VARCHAR(255) NOT NULL,
            is_primary BOOLEAN DEFAULT FALSE
        );
        ''')
        
        # Create agents table
        cur.execute('''
        CREATE TABLE IF NOT EXISTS agents (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            email VARCHAR(255) NOT NULL,
            image_url VARCHAR(255)
        );
        ''')
        
        # Create property_agents table (linking properties to agents)
        cur.execute('''
        CREATE TABLE IF NOT EXISTS property_agents (
            property_id INTEGER REFERENCES properties(id),
            agent_id INTEGER REFERENCES agents(id),
            PRIMARY KEY (property_id, agent_id)
        );
        ''')
        
        # Create users table
        cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ''')
        
        cur.close()
        self.db.close()
    
    def seed_data(self):
        conn = self.db.connect()
        cur = conn.cursor()
        
        # Check if tables are empty
        cur.execute('SELECT COUNT(*) FROM properties;')
        if cur.fetchone()[0] > 0:
            cur.close()
            self.db.close()
            return
        
        # Insert sample properties
        properties = [
            ("Luxury Villa in Sidi Bou Said", "1,200,000 TND", 1200000, "Sidi Bou Said, Tunis", 4, 3, 3500, "Villa", 
             "This stunning luxury villa is located in the picturesque village of Sidi Bou Said, known for its blue and white architecture and panoramic views of the Mediterranean. The property features spacious living areas with high ceilings, a gourmet kitchen, and a private pool surrounded by lush gardens. The master suite offers breathtaking sea views and a luxurious en-suite bathroom. Perfect for those seeking an elegant lifestyle in one of Tunisia's most prestigious neighborhoods.", 36.8702, 10.3417),
            ("Modern Downtown Apartment", "850,000 TND", 850000, "Les Berges du Lac, Tunis", 3, 2, 2800, "Apartment", 
             "This contemporary apartment is situated in the prestigious Les Berges du Lac district, Tunis' modern business and residential hub. The property offers an open-concept living space with floor-to-ceiling windows providing abundant natural light and views of the lake. The kitchen features high-end appliances and custom cabinetry. The master bedroom includes a walk-in closet and en-suite bathroom. Building amenities include 24-hour security, underground parking, and a fitness center.", 36.8324, 10.2331),
            ("Elegant Beachfront Estate", "2,100,000 TND", 2100000, "Hammamet, Tunisia", 5, 4, 4200, "Estate", 
             "This magnificent beachfront estate in Hammamet offers the ultimate in luxury coastal living. Set on a large plot with direct beach access, the property features expansive living spaces with premium finishes throughout. The outdoor area includes a large infinity pool that appears to merge with the Mediterranean, multiple terraces, and a beautifully landscaped garden. The master suite occupies an entire wing of the house, with a private terrace overlooking the sea. Additional features include a home theater, wine cellar, and staff quarters.", 36.4074, 10.6225),
            ("Waterfront Modern Villa", "1,800,000 TND", 1800000, "Gammarth, Tunis", 6, 5, 5500, "Villa", 
             "This contemporary waterfront villa in Gammarth represents the pinnacle of modern architectural design. The property features clean lines, open spaces, and walls of glass that maximize the stunning sea views. The main living area flows seamlessly to the outdoor terrace and infinity pool. The gourmet kitchen is equipped with top-of-the-line appliances and custom cabinetry. Each bedroom has its own en-suite bathroom and access to a balcony or terrace. The property includes a private path to the beach and a rooftop terrace perfect for entertaining.", 36.9185, 10.2881),
            ("Contemporary Home in Carthage", "950,000 TND", 950000, "Carthage, Tunis", 4, 4, 3800, "House", 
             "Located in the historic area of Carthage, this contemporary home offers a perfect blend of modern comfort and traditional charm. The property features an open floor plan with high ceilings and large windows that fill the space with natural light. The kitchen is equipped with high-end appliances and opens to a spacious dining area. The master suite includes a luxurious bathroom with a soaking tub and walk-in shower. The landscaped garden includes a covered patio perfect for outdoor dining and entertaining.", 36.8589, 10.3253),
            ("Luxury Condo with Sea View", "750,000 TND", 750000, "La Marsa, Tunis", 2, 2, 1800, "Condo", 
             "This luxury condo in La Marsa offers spectacular sea views from its prime location. The open-concept living and dining area features floor-to-ceiling windows that showcase the Mediterranean panorama. The kitchen is equipped with premium appliances and stone countertops. Both bedrooms include en-suite bathrooms and built-in wardrobes. The large balcony is perfect for enjoying the sunset over the sea. Building amenities include a swimming pool, fitness center, and 24-hour security.", 36.8775, 10.3237)
        ]
        
        for prop in properties:
            cur.execute('''
            INSERT INTO properties (title, price, price_value, location, beds, baths, sqft, type, description, lat, lng)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
            ''', prop)
            property_id = cur.fetchone()[0]
            
            # Insert features for each property
            if property_id == 1:  # Luxury Villa in Sidi Bou Said
                features = ["Private swimming pool", "Panoramic sea views", "Landscaped gardens", "Marble flooring", 
                           "Smart home technology", "Outdoor dining area", "Security system", "Double garage"]
            elif property_id == 2:  # Modern Downtown Apartment
                features = ["Lake views", "24-hour security", "Underground parking", "Fitness center", 
                           "Central air conditioning", "Italian kitchen", "Marble bathrooms", "Built-in wardrobes"]
            elif property_id == 3:  # Elegant Beachfront Estate
                features = ["Direct beach access", "Infinity pool", "Home theater", "Wine cellar", 
                           "Staff quarters", "Outdoor kitchen", "Multiple terraces", "Landscaped gardens"]
            elif property_id == 4:  # Waterfront Modern Villa
                features = ["Infinity pool", "Private beach access", "Rooftop terrace", "Smart home system", 
                           "Floor-to-ceiling windows", "Designer kitchen", "Elevator", "Outdoor shower"]
            elif property_id == 5:  # Contemporary Home in Carthage
                features = ["Garden with mature trees", "Covered patio", "High ceilings", "Custom lighting", 
                           "Walk-in closets", "Guest suite", "Study/office", "Storage room"]
            else:  # Luxury Condo with Sea View
                features = ["Sea view balcony", "Swimming pool", "Fitness center", "24-hour security", 
                           "Covered parking", "Storage unit", "Elevator access", "Visitor parking"]
                
            for feature in features:
                cur.execute('''
                INSERT INTO property_features (property_id, feature)
                VALUES (%s, %s);
                ''', (property_id, feature))
            
            # Insert images for each property
            if property_id == 1:  # Luxury Villa in Sidi Bou Said
                images = [
                    ("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9", True),
                    ("https://images.unsplash.com/photo-1600210492493-0946911123ea", False),
                    ("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c", False),
                    ("https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9", False)
                ]
            elif property_id == 2:  # Modern Downtown Apartment
                images = [
                    ("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c", True),
                    ("https://images.unsplash.com/photo-1600607687920-4e4a92f082f9", False),
                    ("https://images.unsplash.com/photo-1600607688066-890987f19a02", False),
                    ("https://images.unsplash.com/photo-1600607688969-a48d2a0743e2", False)
                ]
            elif property_id == 3:  # Elegant Beachfront Estate
                images = [
                    ("https://images.unsplash.com/photo-1600585154340-be6161a56a0c", True),
                    ("https://images.unsplash.com/photo-1600585154526-990dced4db0d", False),
                    ("https://images.unsplash.com/photo-1600585154363-67eb9e2ea2ea", False),
                    ("https://images.unsplash.com/photo-1600585154084-4e5fe7c39198", False)
                ]
            elif property_id == 4:  # Waterfront Modern Villa
                images = [
                    ("https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde", True),
                    ("https://images.unsplash.com/photo-1600047509847-f8a83bc8f159", False),
                    ("https://images.unsplash.com/photo-1600047509782-30cd9af85143", False),
                    ("https://images.unsplash.com/photo-1600047509760-6a4a279c0414", False)
                ]
            elif property_id == 5:  # Contemporary Home in Carthage
                images = [
                    ("https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9", True),
                    ("https://images.unsplash.com/photo-1600566753843-5f8d177e4198", False),
                    ("https://images.unsplash.com/photo-1600566752355-35792bedcfea", False),
                    ("https://images.unsplash.com/photo-1600566752734-2a0cd26b80e0", False)
                ]
            else:  # Luxury Condo with Sea View
                images = [
                    ("https://images.unsplash.com/photo-1600573472550-8090b5e0745e", True),
                    ("https://images.unsplash.com/photo-1600573472592-401b489a3cdc", False),
                    ("https://images.unsplash.com/photo-1600573472613-5d9b0e1b3b14", False),
                    ("https://images.unsplash.com/photo-1600573472635-4dd74d6e0561", False)
                ]
                
            for img_url, is_primary in images:
                cur.execute('''
                INSERT INTO property_images (property_id, image_url, is_primary)
                VALUES (%s, %s, %s);
                ''', (property_id, img_url, is_primary))
        
        # Insert sample agents
        agents = [
            ("Sophia Martinez", "+216 71 123 456", "sophia@allianceimmobilier.tn", 
             "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia&backgroundColor=c0aede"),
            ("Michael Chen", "+216 71 123 457", "michael@allianceimmobilier.tn", 
             "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=d1d4f9"),
            ("Alexandra Reynolds", "+216 71 123 458", "alexandra@allianceimmobilier.tn", 
             "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra&backgroundColor=b6e3f4"),
            ("James Wilson", "+216 71 123 459", "james@allianceimmobilier.tn", 
             "https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=b6e3f4"),
            ("Olivia Thompson", "+216 71 123 460", "olivia@allianceimmobilier.tn", 
             "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia&backgroundColor=d1d4f9"),
            ("David Kim", "+216 71 123 461", "david@allianceimmobilier.tn", 
             "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=c0aede")
        ]
        
        for agent in agents:
            cur.execute('''
            INSERT INTO agents (name, phone, email, image_url)
            VALUES (%s, %s, %s, %s) RETURNING id;
            ''', agent)
            agent_id = cur.fetchone()[0]
            
            # Assign agents to properties
            if agent_id == 1:  # Sophia Martinez - Luxury Villa in Sidi Bou Said
                cur.execute('INSERT INTO property_agents VALUES (1, %s);', (agent_id,))
            elif agent_id == 2:  # Michael Chen - Modern Downtown Apartment
                cur.execute('INSERT INTO property_agents VALUES (2, %s);', (agent_id,))
            elif agent_id == 3:  # Alexandra Reynolds - Elegant Beachfront Estate
                cur.execute('INSERT INTO property_agents VALUES (3, %s);', (agent_id,))
            elif agent_id == 4:  # James Wilson - Waterfront Modern Villa
                cur.execute('INSERT INTO property_agents VALUES (4, %s);', (agent_id,))
            elif agent_id == 5:  # Olivia Thompson - Contemporary Home in Carthage
                cur.execute('INSERT INTO property_agents VALUES (5, %s);', (agent_id,))
            else:  # David Kim - Luxury Condo with Sea View
                cur.execute('INSERT INTO property_agents VALUES (6, %s);', (agent_id,))
        
        cur.close()
        self.db.close()
    
    def get_all(self):
        conn = self.db.connect()
        cur = conn.cursor()
        
        cur.execute('''
        SELECT p.id, p.title, p.price, p.price_value, p.location, p.beds, p.baths, p.sqft, p.type, p.is_favorite, 
               i.image_url as image
        FROM properties p
        LEFT JOIN property_images i ON p.id = i.property_id
        WHERE i.is_primary = TRUE
        ORDER BY p.id;
        ''')
        
        properties = []
        for row in cur.fetchall():
            properties.append({
                'id': row[0],
                'title': row[1],
                'price': row[2],
                'priceValue': row[3],
                'location': row[4],
                'beds': row[5],
                'baths': row[6],
                'sqft': row[7],
                'type': row[8],
                'isFavorite': row[9],
                'image': row[10]
            })
        
        cur.close()
        self.db.close()
        
        return properties
    
    def get_by_id(self, property_id):
        conn = self.db.connect()
        cur = conn.cursor()
        
        # Get property details
        cur.execute('''
        SELECT p.id, p.title, p.price, p.location, p.beds, p.baths, p.sqft, p.type, p.description, p.lat, p.lng, p.is_favorite
        FROM properties p
        WHERE p.id = %s;
        ''', (property_id,))
        
        property_data = cur.fetchone()
        if not property_data:
            cur.close()
            self.db.close()
            return None
        
        property_dict = {
            'id': property_data[0],
            'title': property_data[1],
            'price': property_data[2],
            'location': property_data[3],
            'beds': property_data[4],
            'baths': property_data[5],
            'sqft': property_data[6],
            'type': property_data[7],
            'description': property_data[8],
            'lat': property_data[9],
            'lng': property_data[10],
            'isFavorite': property_data[11],
            'features': [],
            'images': [],
            'agent': None
        }
        
        # Get property features
        cur.execute('''
        SELECT feature FROM property_features
        WHERE property_id = %s;
        ''', (property_id,))
        
        property_dict['features'] = [row[0] for row in cur.fetchall()]
        
        # Get property images
        cur.execute('''
        SELECT image_url FROM property_images
        WHERE property_id = %s
        ORDER BY is_primary DESC;
        ''', (property_id,))
        
        property_dict['images'] = [row[0] for row in cur.fetchall()]
        
        # Get agent details
        cur.execute('''
        SELECT a.name, a.phone, a.email, a.image_url
        FROM agents a
        JOIN property_agents pa ON a.id = pa.agent_id
        WHERE pa.property_id = %s;
        ''', (property_id,))
        
        agent_data = cur.fetchone()
        if agent_data:
            property_dict['agent'] = {
                'name': agent_data[0],
                'phone': agent_data[1],
                'email': agent_data[2],
                'image': agent_data[3]
            }
        
        cur.close()
        self.db.close()
        
        return property_dict
    
    def toggle_favorite(self, property_id):
        conn = self.db.connect()
        cur = conn.cursor()
        
        # Get current favorite status
        cur.execute('SELECT is_favorite FROM properties WHERE id = %s;', (property_id,))
        result = cur.fetchone()
        
        if not result:
            cur.close()
            self.db.close()
            return None
        
        current_status = result[0]
        new_status = not current_status
        
        # Update favorite status
        cur.execute('UPDATE properties SET is_favorite = %s WHERE id = %s;', (new_status, property_id))
        
        cur.close()
        self.db.close()
        
        return {'id': property_id, 'isFavorite': new_status}

class UserModel:
    def __init__(self, db):
        self.db = db
    
    def register(self, username, email, password):
        conn = self.db.connect()
        cur = conn.cursor()
        
        # Check if username or email already exists
        cur.execute('SELECT id FROM users WHERE username = %s OR email = %s;', (username, email))
        if cur.fetchone():
            cur.close()
            self.db.close()
            return None, "Username or email already exists"
        
        # Insert new user
        cur.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s) RETURNING id;',
            (username, email, password)  # In a real app, use a hashed password
        )
        user_id = cur.fetchone()[0]
        
        cur.close()
        self.db.close()
        
        return {'id': user_id, 'username': username, 'email': email}, None
    
    def login(self, username, password):
        conn = self.db.connect()
        cur = conn.cursor()
        
        cur.execute('SELECT id, email FROM users WHERE username = %s AND password_hash = %s;', (username, password))
        user = cur.fetchone()
        
        cur.close()
        self.db.close()
        
        if not user:
            return None, "Invalid username or password"
        
        return {
            'id': user[0],
            'username': username,
            'email': user[1],
            'token': 'sample-jwt-token'  # In a real app, generate a JWT token
        }, None

class ContactModel:
    def __init__(self, db):
        self.db = db
    
    def submit_form(self, name, email, message, phone=None):
        # In a real app, you would save this to the database
        # For now, just return success
        return {'success': True, 'message': 'Contact form submitted successfully'}

# Initialize models
db = Database()
property_model = PropertyModel(db)
user_model = UserModel(db)
contact_model = ContactModel(db)

# API Routes
@app.route('/api/properties', methods=['GET'])
def get_properties():
    properties = property_model.get_all()
    return jsonify(properties)

@app.route('/api/properties/<int:property_id>', methods=['GET'])
def get_property(property_id):
    property_data = property_model.get_by_id(property_id)
    if not property_data:
        return jsonify({'error': 'Property not found'}), 404
    return jsonify(property_data)

@app.route('/api/properties/<int:property_id>/favorite', methods=['POST'])
def toggle_favorite(property_id):
    result = property_model.toggle_favorite(property_id)
    if not result:
        return jsonify({'error': 'Property not found'}), 404
    return jsonify(result)

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not all(k in data for k in ('username', 'email', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    user, error = user_model.register(data['username'], data['email'], data['password'])
    if error:
        return jsonify({'error': error}), 409
    
    return jsonify(user), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not all(k in data for k in ('username', 'password')):
        return jsonify({'error': 'Missing username or password'}), 400
    
    user, error = user_model.login(data['username'], data['password'])
    if error:
        return jsonify({'error': error}), 401
    
    return jsonify(user)

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    data = request.get_json()
    
    if not data or not all(k in data for k in ('name', 'email', 'message')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    result = contact_model.submit_form(
        data['name'], 
        data['email'], 
        data['message'], 
        data.get('phone')
    )
    
    return jsonify(result)

# Initialize the database when the app starts
@app.before_first_request
def before_first_request():
    property_model.init_tables()
    property_model.seed_data()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
