import json
import uuid
import os

file_path = "stories/apocylips-love-system/[Hindi (auto-generated)] Apocalypse Love System I Tamed a Zombie Girl & Built the Ultimate Survival .txt"
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

clean_lines = [line.strip() for line in lines if line.strip() and not line.startswith("Created At") and not line.startswith("Completed At")]

total_lines = len(clean_lines)
episodes_per_season = 10
seasons_count = 2
lines_per_season = total_lines // seasons_count
lines_per_episode = lines_per_season // episodes_per_season
parts_per_episode = 10
lines_per_part = lines_per_episode // parts_per_episode

story = {
    "id": str(uuid.uuid4()),
    "title": "Apocalypse Love System",
    "slug": "apocalypse-love-system",
    "posterImage": "/images/stories/apocalypse-love-system.png",
    "description": "I tamed a zombie girl and built the ultimate survival base. In this apocalypse, love is the only system that matters.",
    "genres": ["Fantasy", "Romance", "Thriller"],
    "rating": 4.7,
    "views": "1.8M",
    "status": "Ongoing",
    "availableLanguages": ["hi"],
    "seasons": []
}

current_line = 0
for s_idx in range(seasons_count):
    season = {
        "seasonNumber": s_idx + 1,
        "title": f"Season {s_idx+1}: Survival",
        "description": f"The beginning of the end. Season {s_idx+1}.",
        "episodes": []
    }
    
    for e_idx in range(episodes_per_season):
        episode = {
            "id": f"apoc-s{s_idx+1}e{e_idx+1}",
            "episodeNumber": e_idx + 1,
            "title": f"Episode {e_idx+1}",
            "duration": "8 min",
            "isLocked": (s_idx > 0) or (e_idx > 2),
            "parts": []
        }
        
        for p_idx in range(parts_per_episode):
            if current_line >= total_lines:
                break
            
            part_lines = clean_lines[current_line : current_line + lines_per_part]
            current_line += lines_per_part
            
            hindi_text = "\n\n".join(part_lines)
            
            part = {
                "id": f"apoc-s{s_idx+1}e{e_idx+1}p{p_idx+1}",
                "text": hindi_text
            }
            episode["parts"].append(part)
        
        season["episodes"].append(episode)
    
    story["seasons"].append(season)

with open("src/stories/apocalypse-love-system.json", 'w', encoding='utf-8') as f:
    json.dump(story, f, ensure_ascii=False, indent=2)

print("Successfully generated apocalypse-love-system.json")
