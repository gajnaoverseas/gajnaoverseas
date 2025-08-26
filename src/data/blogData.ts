// Blog data for the Blog component

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  featureImage: string;
  content: string;
}

const blogData: BlogPost[] = [
  {
    id: "coffee-plantations-in-india",
    title: "Coffee Plantations in India and it's exports",
    date: "June 23, 2025",
    excerpt:
      "Discover the rich history and current state of coffee plantations across India, and how they contribute to global exports.",
    featureImage: "/blog/feature/images/coffee-plantations-in-india.webp",
    content: `
# Coffee Plantations in India and it's exports

India's coffee journey began in the 17th century when Baba Budan, a pilgrim, smuggled seven coffee beans from Yemen to India. These seven beans, planted in the hills of Chikmagalur, Karnataka, marked the beginning of coffee cultivation in India.

## Major Coffee Growing Regions

### Karnataka
Karnataka accounts for approximately 70% of India's coffee production. The key coffee-growing districts include Chikmagalur, Kodagu (Coorg), and Hassan. The region's high altitude, ample rainfall, and rich soil create ideal conditions for growing both Arabica and Robusta varieties.

### Kerala
Kerala contributes about 20% of India's coffee production, with Wayanad being the primary coffee-growing district. The region is known for its high-quality Robusta coffee.

### Tamil Nadu
Tamil Nadu produces around 5% of India's coffee, primarily in the Nilgiri Hills. The region's unique microclimate allows for the cultivation of specialty coffee varieties.

## Export Landscape

India exports approximately 70-80% of its coffee production to international markets. The country ranks as the sixth-largest coffee producer globally and contributes about 4% to the world's coffee production.

Key export destinations include:
- Italy
- Germany
- Russia
- Belgium
- Turkey
- United Kingdom
- United States

Indian coffee is particularly valued for its mild, low-acidity profile and is often used in premium blends worldwide.

## Sustainability Practices

Indian coffee is predominantly shade-grown, which promotes biodiversity and ecological balance. Many Indian coffee plantations maintain a three-tier shade system, which includes tall native trees, medium-height fruit trees, and coffee plants.

This sustainable approach has earned Indian coffee recognition in specialty markets, where environmentally conscious practices are increasingly valued.
    `,
  },
  {
    id: "gi-tagged-coffees-of-india",
    title: "GI Tagged Coffees of India",
    date: "May 18, 2025",
    excerpt:
      "Learn about the unique Geographical Indication tagged coffees from different regions of India and what makes them special.",
    featureImage: "/blog/feature/images/r.webp",
    content: `
# GI Tagged Coffees of India

Geographical Indication (GI) tags protect products that have a specific geographical origin and possess qualities or a reputation due to that origin. India has several GI-tagged coffees that showcase the unique characteristics of their growing regions.

## Coorg Arabica Coffee

Coorg (Kodagu) Arabica Coffee received its GI tag in 2019. Grown in the Western Ghats of Karnataka, this coffee is known for its:

- Distinctive fragrance with notes of chocolate and spice
- Medium body with balanced acidity
- Cultivation at elevations between 1,000-1,500 meters

The unique microclimate of Coorg, characterized by misty mornings and sunny afternoons, contributes to the coffee's exceptional flavor profile.

## Wayanad Robusta Coffee

Wayanad Robusta Coffee from Kerala received its GI tag in 2019. This coffee is distinguished by:

- Bold, full-bodied flavor
- Low acidity with earthy, woody notes
- Higher caffeine content compared to Arabica

The rich volcanic soil of Wayanad imparts unique mineral characteristics to the coffee beans.

## Chikmagalur Arabica Coffee

Chikmagalur Arabica Coffee, from the birthplace of Indian coffee, received its GI tag in 2019. It features:

- Subtle floral aroma with hints of citrus
- Clean, bright cup with medium acidity
- Smooth finish with caramel sweetness

The high-altitude plantations of Chikmagalur, often shrouded in mist, create ideal conditions for slow bean maturation, enhancing flavor development.

## Araku Valley Arabica Coffee

Araku Valley Arabica Coffee from Andhra Pradesh received its GI tag in 2019. This coffee is unique for its:

- Fruity, floral notes with a hint of spice
- Medium body with pleasant acidity
- Organic cultivation practices by tribal communities

The Araku Valley's unique combination of altitude, rainfall, and soil composition contributes to the coffee's distinctive character.

## Bababudangiri Arabica Coffee

Named after Baba Budan who introduced coffee to India, this coffee from Karnataka received its GI tag in 2019. It is characterized by:

- Rich aroma with notes of chocolate and nuts
- Medium to full body with balanced acidity
- Smooth finish with a lingering sweetness

The historical significance of this region adds to the cultural value of Bababudangiri Arabica Coffee.
    `,
  },
  {
    id: "intercropping-in-coffee-farming",
    title: "Intercropping in Coffee Farming",
    date: "April 05, 2025",
    excerpt:
      "Explore the sustainable practice of intercropping in coffee plantations and its benefits for farmers and the environment.",
    featureImage: "/blog/feature/images/intercropping-in-coffee-farming.webp",
    content: `
# Intercropping in Coffee Farming

Intercropping, the practice of growing multiple crops in the same area, has been a traditional feature of Indian coffee cultivation for centuries. This sustainable approach offers numerous benefits for farmers, the environment, and even the quality of coffee produced.

## Common Intercrops in Indian Coffee Plantations

### Spices
- **Pepper**: Often grown on the same trees that provide shade to coffee plants
- **Cardamom**: Thrives in the understory of coffee plantations
- **Cinnamon**: Compatible with coffee's growth requirements
- **Vanilla**: Utilizes shade trees as support structures

### Fruits
- **Oranges**: Provide additional income during coffee's off-season
- **Bananas**: Offer temporary shade for young coffee plants
- **Avocados**: Growing in popularity as a high-value intercrop

### Other Crops
- **Areca nut**: Traditional companion crop in many regions
- **Coconut**: Provides upper canopy shade in some areas
- **Silver Oak**: Serves dual purpose as shade and timber

## Benefits of Intercropping

### Economic Benefits
- **Income Diversification**: Reduces dependency on coffee as the sole income source
- **Risk Mitigation**: Protects against market fluctuations and crop failures
- **Year-round Revenue**: Different crops harvest at different times

### Environmental Benefits
- **Biodiversity Enhancement**: Creates habitat for diverse flora and fauna
- **Soil Health Improvement**: Different root systems access nutrients at various soil depths
- **Pest Management**: Diverse plantings disrupt pest cycles naturally
- **Carbon Sequestration**: Multiple plant species capture more carbon

### Coffee Quality Benefits
- **Flavor Enhancement**: Some companion plants influence coffee's flavor profile
- **Microclimate Regulation**: Intercrops help maintain optimal growing conditions
- **Natural Fertilization**: Leaf litter from various plants enriches soil

## Challenges and Considerations

While intercropping offers numerous benefits, farmers must carefully consider:

- **Resource Competition**: Ensuring intercrops don't compete excessively with coffee for water and nutrients
- **Management Complexity**: Different crops require different care regimens
- **Harvest Logistics**: Organizing labor for multiple harvest schedules
- **Market Access**: Developing channels for selling diverse products

Despite these challenges, intercropping remains a cornerstone of sustainable coffee farming in India, contributing to the unique character of Indian coffee while supporting farmer resilience in a changing climate.
    `,
  },
];

export default blogData;
