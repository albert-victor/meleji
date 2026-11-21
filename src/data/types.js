/**
 * @typedef {'published' | 'draft' | 'fixture'} ContentStatus
 */

/**
 * @typedef {Object} AccommodationItem
 * @property {string} id
 * @property {ContentStatus} status
 * @property {string} title
 * @property {string} slug
 * @property {string} description
 * @property {string} imageSrc – bundler-resolved URL
 * @property {string} imageAlt
 * @property {string} [occupancy]
 * @property {string} [priceNote] – e.g. "Rates on request" only when approved
 * @property {number} [priceFrom]
 * @property {string} [priceUnit]
 * @property {string} [priceSubline]
 * @property {number} [ratingStars] – decorative display only, not a review score
 * @property {string} [roomKicker]
 * @property {string} [availabilityBadge]
 * @property {{ icon: string, label: string }[]} [services]
 * @property {DestinationGalleryImage[]} [gallery]
 * @property {object} [pricing]
 * @property {string} [longDescription]
 * @property {string[]} [amenities]
 * @property {string} [bookingHref]
 * @property {string} href
 */

/**
 * @typedef {Object} DestinationGalleryImage
 * @property {string} src – bundler-resolved URL
 * @property {string} alt
 */

/**
 * @typedef {Object} DestinationItem
 * @property {string} id
 * @property {ContentStatus} status
 * @property {string} name
 * @property {string} slug
 * @property {string} region
 * @property {string} summary
 * @property {string} [longDescription]
 * @property {string[]} [context] – paragraph blocks for detail layout
 * @property {string} [category]
 * @property {string} [sizeLabel]
 * @property {string[]} [activities]
 * @property {DestinationGalleryImage[]} [gallery]
 * @property {string} imageSrc
 * @property {string} [landscapeSrc]
 * @property {string} imageAlt
 * @property {string} href
 * @property {string} [sourceUrl]
 * @property {string} [sourceNote]
 */

/**
 * @typedef {Object} ItineraryDay
 * @property {number} day
 * @property {string} title
 * @property {string} body
 */

/**
 * @typedef {Object} SafariPackageItem
 * @property {string} id
 * @property {ContentStatus} status
 * @property {string} name
 * @property {string} slug
 * @property {string[]} destinationSlugs
 * @property {string|null} [durationLabel]
 * @property {string} [safariType]
 * @property {string} [tailorMade]
 * @property {string} [region]
 * @property {string} summary
 * @property {string} [longDescription]
 * @property {string[]} [context]
 * @property {string[]} [activities]
 * @property {ItineraryDay[]} [itinerary]
 * @property {DestinationGalleryImage[]} [gallery]
 * @property {string} imageSrc
 * @property {string} [landscapeSrc]
 * @property {string} imageAlt
 * @property {string} href
 * @property {string} enquiryHref
 * @property {string} [availabilityNote]
 * @property {string} [sourceUrl]
 * @property {string} [sourceNote]
 */

/**
 * @typedef {Object} SafariActivityItem
 * @property {string} id
 * @property {ContentStatus} status
 * @property {string} title
 * @property {string} slug
 * @property {string} icon – Font Awesome e.g. fa-mug-hot
 * @property {string} summary
 * @property {string} longDescription
 * @property {string[]} [context]
 * @property {string[]} [highlights]
 * @property {string[]} [relatedActivities]
 * @property {ItineraryDay[]} [itinerarySample]
 * @property {DestinationGalleryImage[]} [gallery]
 * @property {string} imageSrc
 * @property {string} [landscapeSrc]
 * @property {string} imageAlt
 * @property {string} href
 * @property {string} enquiryHref
 * @property {string} [sourceUrl]
 * @property {string} [sourceNote]
 */

/**
 * @typedef {Object} ExperienceItem
 * @property {string} id
 * @property {ContentStatus} status
 * @property {string} title
 * @property {string} slug
 * @property {string} summary
 * @property {string} imageSrc
 * @property {string} imageAlt
 * @property {string} href
 */

/**
 * @typedef {Object} ActivityIconItem
 * @property {string} id
 * @property {string} label
 * @property {string} icon – Font Awesome class e.g. fa-mug-hot
 * @property {string} [description]
 */

/**
 * @typedef {Object} CommunityProgrammeItem
 * @property {string} id
 * @property {ContentStatus} status
 * @property {string} title
 * @property {string} summary
 * @property {string} imageSrc
 * @property {string} imageAlt
 * @property {string} href
 */

export {};
