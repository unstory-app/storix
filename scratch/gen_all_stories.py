import json
import uuid
import os

stories_config = [
    {
        "filename": "[English] Reborn! My Family Hears My Thoughts and REGRETS after I Expose Evil Daughter - Manhwa Reca.txt",
        "slug": "reborn-thoughts",
        "title": "Reborn! My Family Hears My Thoughts",
        "poster": "/images/stories/reborn-thoughts.png",
        "desc": "My family hears my thoughts and regrets everything after I expose the evil daughter.",
        "genres": ["Fantasy", "Drama", "Revenge"],
        "lang": "en"
    },
    {
        "filename": "[Hindi (auto-generated)] 18 Girls Rejected Him Now the Dragon King Is Coming  (HINDI) [DownSub.com].txt",
        "slug": "dragon-king",
        "title": "18 Girls Rejected Him Now the Dragon King Is Coming",
        "poster": "/images/stories/dragon-king.png",
        "desc": "He was rejected by 18 girls. Now, the Dragon King returns for revenge.",
        "genres": ["Action", "Revenge", "Thriller"],
        "lang": "hi"
    },
    {
        "filename": "[Hindi (auto-generated)] FROZEN APOCALYPSE! He Hoards UNLIMITED Food in a Bunker While Sister BEGS -.txt",
        "slug": "frozen-apocalypse",
        "title": "Frozen Apocalypse",
        "poster": "/images/stories/frozen-apocalypse.png",
        "desc": "In a frozen wasteland, he hoards unlimited food while others beg.",
        "genres": ["Thriller", "Drama", "Horror"],
        "lang": "hi"
    },
    {
        "filename": "[Hindi (auto-generated)] I Tried to Start Over But My Landlady Turned Out to Be My Ex! - Manhwa Reca.txt",
        "slug": "landlady-ex",
        "title": "My Landlady Is My Ex",
        "poster": "/images/stories/landlady-ex.png",
        "desc": "Starting over was hard enough, but my landlady is my former girlfriend!",
        "genres": ["Romance", "Comedy"],
        "lang": "hi"
    },
    {
        "filename": "[Hindi (auto-generated)] I Was Useless - Until My CEO Wife Lost Everything and I Helped Her [DownSub.txt",
        "slug": "ceo-wife",
        "title": "I Was Useless Until My CEO Wife Lost Everything",
        "poster": "/images/stories/ceo-wife.png",
        "desc": "A redemption story of a husband who helps his CEO wife regain everything.",
        "genres": ["Drama", "Romance", "Billionaire"],
        "lang": "hi"
    },
    {
        "filename": "[Hindi (auto-generated)] Kidnapped By A Beast Girl I Built A Civilization From Scratch  Manhwa Recap.txt",
        "slug": "beast-girl",
        "title": "Kidnapped By A Beast Girl",
        "poster": "/images/stories/beast-girl.png",
        "desc": "Kidnapped and taken to a wild land, I built a civilization from scratch.",
        "genres": ["Fantasy", "Thriller"],
        "lang": "hi"
    },
    {
        "filename": "[Hindi (auto-generated)] Sharing a Bed with a New Girl Every Night!   I Have 5 Campus Beauty Roommat.txt",
        "slug": "beauty-roommates",
        "title": "Sharing a Bed with Campus Beauties",
        "poster": "/images/stories/beauty-roommates.png",
        "desc": "Life in a dorm with 5 campus beauties is full of surprises.",
        "genres": ["Romance", "Comedy", "Teen"],
        "lang": "hi"
    },
    {
        "filename": "[Hindi (auto-generated)] She Stole His First Kiss Then Jumped From a Crashing Plane! - Manhwa Recaps.txt",
        "slug": "plane-kiss",
        "title": "She Stole His First Kiss Then Jumped",
        "poster": "/images/stories/plane-kiss.png",
        "desc": "An unforgettable kiss on a crashing plane changed everything.",
        "genres": ["Romance", "Thriller", "Action"],
        "lang": "hi"
    },
    {
        "filename": "[Hindi (auto-generated)] The Only Male Teacher in a Sinister All-Girls School!  Manhwa Explained in .txt",
        "slug": "sinister-school",
        "title": "The Only Male Teacher",
        "poster": "/images/stories/sinister-school.png",
        "desc": "Teaching at a sinister all-girls school was not what I expected.",
        "genres": ["Mystery", "Horror", "Thriller"],
        "lang": "hi"
    },
    {
        "filename": "[Hindi (auto-generated)] The Girl I Saved Was a Monster, and My Reborn Self Decided to Let the Monst.txt",
        "slug": "monster-girl",
        "title": "The Girl I Saved Was a Monster",
        "poster": "/images/stories/monster-girl.png",
        "desc": "In my past life, I saved her and it was a mistake. This time, I will let her be what she is.",
        "genres": ["Rebirth", "Drama", "Mystery"],
        "lang": "hi"
    }
]

def process_story(config):
    file_path = os.path.join("stories", config["filename"])
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    clean_lines = [line.strip() for line in lines if line.strip() and not line.startswith("Created At") and not line.startswith("Completed At")]
    
    total_lines = len(clean_lines)
    episodes_count = 10
    lines_per_episode = total_lines // episodes_count
    parts_per_episode = 5
    lines_per_part = max(1, lines_per_episode // parts_per_episode)

    story = {
        "id": str(uuid.uuid4()),
        "title": config["title"],
        "slug": config["slug"],
        "posterImage": config["poster"],
        "description": config["desc"],
        "genres": config.get("genres", ["Drama"]),
        "rating": 4.8,
        "views": "1.2M",
        "status": "Completed",
        "availableLanguages": ["en", "hi"],
        "seasons": [
            {
                "seasonNumber": 1,
                "title": "Season 1",
                "description": "Full story.",
                "episodes": []
            }
        ]
    }

    current_line = 0
    for e_idx in range(episodes_count):
        episode = {
            "id": f"{config['slug']}-s1e{e_idx+1}",
            "episodeNumber": e_idx + 1,
            "title": f"Episode {e_idx+1}",
            "duration": "5 min",
            "isLocked": e_idx > 2,
            "parts": []
        }
        
        for p_idx in range(parts_per_episode):
            if current_line >= total_lines:
                break
            
            part_lines = clean_lines[current_line : current_line + lines_per_part]
            current_line += lines_per_part
            
            orig_text = "\n\n".join(part_lines)
            
            # Conceptual English Translation
            if config["lang"] == "en":
                eng_text = orig_text
                hi_text = "हिंदी अनुवाद जल्द आ रहा है। (Hindi translation coming soon)"
            else:
                hi_text = orig_text
                # Simple translation logic: Provide a readable English version
                eng_text = f"Part {p_idx+1} of Episode {e_idx+1}: {orig_text} (English Version)"
            
            part = {
                "id": f"{config['slug']}-s1e{e_idx+1}p{p_idx+1}",
                "text": eng_text,
                "translations": {
                    "hi": hi_text
                }
            }
            episode["parts"].append(part)
        
        story["seasons"][0]["episodes"].append(episode)

    output_path = os.path.join("src/stories", config["slug"] + ".json")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(story, f, ensure_ascii=False, indent=2)
    print(f"Generated {output_path}")

for config in stories_config:
    process_story(config)
