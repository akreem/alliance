from django.core.management.base import BaseCommand
from properties.models import Property, PropertyFeature, PropertyImage, Agent

class Command(BaseCommand):
    help = 'Seeds the database with initial property data'
    
    def handle(self, *args, **options):
        # Check if data already exists
        if Property.objects.exists():
            self.stdout.write(self.style.WARNING('Data already exists, skipping seeding'))
            return
        
        self.stdout.write(self.style.SUCCESS('Seeding database...'))
        
        # Create properties
        properties = [
            {
                'title': 'Luxury Villa in Sidi Bou Said',
                'price': '1,200,000 TND',
                'price_value': 1200000,
                'location': 'Sidi Bou Said, Tunis',
                'beds': 4,
                'baths': 3,
                'sqft': 3500,
                'type': 'Villa',
                'description': 'This stunning luxury villa is located in the picturesque village of Sidi Bou Said, known for its blue and white architecture and panoramic views of the Mediterranean. The property features spacious living areas with high ceilings, a gourmet kitchen, and a private pool surrounded by lush gardens. The master suite offers breathtaking sea views and a luxurious en-suite bathroom. Perfect for those seeking an elegant lifestyle in one of Tunisia\'s most prestigious neighborhoods.',
                'lat': 36.8702,
                'lng': 10.3417,
                'features': [
                    'Private swimming pool',
                    'Panoramic sea views',
                    'Landscaped gardens',
                    'Marble flooring',
                    'Smart home technology',
                    'Outdoor dining area',
                    'Security system',
                    'Double garage'
                ],
                'images': [
                    {'url': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', 'is_primary': True},
                    {'url': 'https://images.unsplash.com/photo-1600210492493-0946911123ea', 'is_primary': False},
                    {'url': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c', 'is_primary': False},
                    {'url': 'https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9', 'is_primary': False}
                ],
                'agent': {
                    'name': 'Sophia Martinez',
                    'phone': '+216 71 123 456',
                    'email': 'sophia@allianceimmobilier.tn',
                    'image': 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia&backgroundColor=c0aede'
                }
            },
            {
                'title': 'Modern Downtown Apartment',
                'price': '850,000 TND',
                'price_value': 850000,
                'location': 'Les Berges du Lac, Tunis',
                'beds': 3,
                'baths': 2,
                'sqft': 2800,
                'type': 'Apartment',
                'description': 'This contemporary apartment is situated in the prestigious Les Berges du Lac district, Tunis\' modern business and residential hub. The property offers an open-concept living space with floor-to-ceiling windows providing abundant natural light and views of the lake. The kitchen features high-end appliances and custom cabinetry. The master bedroom includes a walk-in closet and en-suite bathroom. Building amenities include 24-hour security, underground parking, and a fitness center.',
                'lat': 36.8324,
                'lng': 10.2331,
                'features': [
                    'Lake views',
                    '24-hour security',
                    'Underground parking',
                    'Fitness center',
                    'Central air conditioning',
                    'Italian kitchen',
                    'Marble bathrooms',
                    'Built-in wardrobes'
                ],
                'images': [
                    {'url': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c', 'is_primary': True},
                    {'url': 'https://images.unsplash.com/photo-1600607687920-4e4a92f082f9', 'is_primary': False},
                    {'url': 'https://images.unsplash.com/photo-1600607688066-890987f19a02', 'is_primary': False},
                    {'url': 'https://images.unsplash.com/photo-1600607688969-a48d2a0743e2', 'is_primary': False}
                ],
                'agent': {
                    'name': 'Michael Chen',
                    'phone': '+216 71 123 457',
                    'email': 'michael@allianceimmobilier.tn',
                    'image': 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=d1d4f9'
                }
            },
            {
                'title': 'Elegant Beachfront Estate',
                'price': '2,100,000 TND',
                'price_value': 2100000,
                'location': 'Hammamet, Tunisia',
                'beds': 5,
                'baths': 4,
                'sqft': 4200,
                'type': 'Estate',
                'description': 'This magnificent beachfront estate in Hammamet offers the ultimate in luxury coastal living. Set on a large plot with direct beach access, the property features expansive living spaces with premium finishes throughout. The outdoor area includes a large infinity pool that appears to merge with the Mediterranean, multiple terraces, and a beautifully landscaped garden. The master suite occupies an entire wing of the house, with a private terrace overlooking the sea. Additional features include a home theater, wine cellar, and staff quarters.',
                'lat': 36.4074,
                'lng': 10.6225,
                'features': [
                    'Direct beach access',
                    'Infinity pool',
                    'Home theater',
                    'Wine cellar',
                    'Staff quarters',
                    'Outdoor kitchen',
                    'Multiple terraces',
                    'Landscaped gardens'
                ],
                'images': [
                    {'url': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', 'is_primary': True},
                    {'url': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d', 'is_primary': False},
                    {'url': 'https://images.unsplash.com/photo-1600585154363-67eb9e2ea2ea', 'is_primary': False},
                    {'url': 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198', 'is_primary': False}
                ],
                'agent': {
                    'name': 'Alexandra Reynolds',
                    'phone': '+216 71 123 458',
                    'email': 'alexandra@allianceimmobilier.tn',
                    'image': 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra&backgroundColor=b6e3f4'
                }
            },
            {
                'title': 'Waterfront Modern Villa',
                'price': '1,800,000 TND',
                'price_value': 1800000,
                'location': 'Gammarth, Tunis',
                'beds': 6,
                'baths': 5,
                'sqft': 5500,
                'type': 'Villa',
                'description': 'This contemporary waterfront villa in Gammarth represents the pinnacle of modern architectural design. The property features clean lines, open spaces, and walls of glass that maximize the stunning sea views. The main living area flows seamlessly to the outdoor terrace and infinity pool. The gourmet kitchen is equipped with top-of-the-line appliances and custom cabinetry. Each bedroom has its own en-suite bathroom and access to a balcony or terrace. The property includes a private path to the beach and a rooftop terrace perfect for entertaining.',
                'lat': 36.9185,
                'lng': 10.2881,
                'features': [
                    'Infinity pool',
                    'Private beach access',
                    'Rooftop terrace',
                    'Smart home system',
                    'Floor-to-ceiling windows',
                    'Designer kitchen',
                    'Elevator',
                    'Outdoor shower'
                ],
                'images': [
                    {'url': 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde', 'is_primary': True},
                    {'url': 'https://images.unsplash.com/photo-1600047509847-f8a83bc8f159', 'is_primary': False},
                    {'url': 'https://images.unsplash.com/photo-1600047509782-30cd9af85143', 'is_primary': False},
                    {'url': 'https://images.unsplash.com/photo-1600047509760-6a4a279c0414', 'is_primary': False}
                ],
                'agent': {
                    'name': 'James Wilson',
                    'phone': '+216 71 123 459',
                    'email': 'james@allianceimmobilier.tn',
                    'image': 'https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=b6e3f4'
                }
            },
            {
                'title': 'Contemporary Home in Carthage',
                'price': '950,000 TND',
                'price_value': 950000,
                'location': 'Carthage, Tunis',
                'beds': 4,
                'baths': 4,
                'sqft': 3800,
                'type': 'House',
                'description': 'Located in the historic area of Carthage, this contemporary home offers a perfect blend of modern comfort and traditional charm. The property features an open floor plan with high ceilings and large windows that fill the space with natural light. The kitchen is equipped with high-end appliances and opens to a spacious dining area. The master suite includes a luxurious bathroom with a soaking tub and walk-in shower. The landscaped garden includes a covered patio perfect for outdoor dining and entertaining.',
                'lat': 36.8589,
                'lng': 10.3253,
                'features': [
                    'Garden with mature trees',
                    'Covered patio',
                    'High ceilings',
                    'Custom lighting',
                    'Walk-in closets',
                    'Guest suite',
                    'Study/office',
                    'Storage room'
                ],
                'images': [
                    {'url': 'https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9', 'is_primary': True},
                    {'url': 'https://images.unsplash.com/photo-1600566753843-5f8d177e4198', 'is_primary': False},
                    {'url': 'https://images.unsplash.com/photo-1600566752355-35792bedcfea', 'is_primary': False},
                    {'url': 'https://images.unsplash.com/photo-1600566752734-2a0cd26b80e0', 'is_primary': False}
                ],
                'agent': {
                    'name': 'Olivia Thompson',
                    'phone': '+216 71 123 460',
                    'email': 'olivia@allianceimmobilier.tn',
                    'image': 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia&backgroundColor=d1d4f9'
                }
            },
            {
                'title': 'Luxury Condo with Sea View',
                'price': '750,000 TND',
                'price_value': 750000,
                'location': 'La Marsa, Tunis',
                'beds': 2,
                'baths': 2,
                'sqft': 1800,
                'type': 'Condo',
                'description': 'This luxury condo in La Marsa offers spectacular sea views from its prime location. The open-concept living and dining area features floor-to-ceiling windows that showcase the Mediterranean panorama. The kitchen is equipped with premium appliances and stone countertops. Both bedrooms include en-suite bathrooms and built-in wardrobes. The large balcony is perfect for enjoying the sunset over the sea. Building amenities include a swimming pool, fitness center, and 24-hour security.',
                'lat': 36.8775,
                'lng': 10.3237,
                'features': [
                    'Sea view balcony',
                    'Swimming pool',
                    'Fitness center',
                    '24-hour security',
                    'Covered parking',
                    'Storage unit',
                    'Elevator access',
                    'Visitor parking'
                ],
                'images': [
                    {'url': 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e', 'is_primary': True},
                    {'url': 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc', 'is_primary': False},
                    {'url': 'https://images.unsplash.com/photo-1600573472613-5d9b0e1b3b14', 'is_primary': False},
                    {'url': 'https://images.unsplash.com/photo-1600573472635-4dd74d6e0561', 'is_primary': False}
                ],
                'agent': {
                    'name': 'David Kim',
                    'phone': '+216 71 123 461',
                    'email': 'david@allianceimmobilier.tn',
                    'image': 'https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=c0aede'
                }
            }
        ]
        
        # Create agents first
        agents = {}
        for prop_data in properties:
            agent_data = prop_data['agent']
            if agent_data['name'] not in agents:
                agent = Agent.objects.create(
                    name=agent_data['name'],
                    phone=agent_data['phone'],
                    email=agent_data['email'],
                    image_url=agent_data['image']
                )
                agents[agent_data['name']] = agent
        
        # Create properties and related objects
        for prop_data in properties:
            # Create property
            property = Property.objects.create(
                title=prop_data['title'],
                price=prop_data['price'],
                price_value=prop_data['price_value'],
                location=prop_data['location'],
                beds=prop_data['beds'],
                baths=prop_data['baths'],
                sqft=prop_data['sqft'],
                type=prop_data['type'],
                description=prop_data['description'],
                lat=prop_data['lat'],
                lng=prop_data['lng']
            )
            
            # Add features
            for feature in prop_data['features']:
                PropertyFeature.objects.create(
                    property=property,
                    feature=feature
                )
            
            # Add images
            for image_data in prop_data['images']:
                PropertyImage.objects.create(
                    property=property,
                    image_url=image_data['url'],
                    is_primary=image_data['is_primary']
                )
            
            # Link agent
            agent = agents[prop_data['agent']['name']]
            agent.properties.add(property)
        
        self.stdout.write(self.style.SUCCESS('Successfully seeded database'))
